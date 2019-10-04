import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

export type linkIdentity = number | string;

export interface ObjectBase {
    created: Date;
    edited: Date;
    url: linkIdentity;
}

export interface ListBase<TItem extends ObjectBase> {
    count: number;
    next: string;
    previous: string;
    results: TItem[];
}

export interface INotFound {
    detail: string;
}

export class ObjectAssistant {

    public static getUrlId(url: string | null) {
        if (url === null) {
            return null;
        }
        const mtch = url.match(/\/api\/(.*?)\/(.*)\/$/);
        return mtch ? Number(mtch[2]) : null;
    }

    public static getObjectId(object: ObjectBase) {
        const { url } = object;
        return ObjectAssistant.getUrlId(url as string);
    }

    public static prepareObject(object) {
        object = changeObjectSchema(object, convertProperty);
        object.url = ObjectAssistant.getObjectId(object);
        ObjectAssistant.normalizeFields(object, ['created', 'edited'], 'date');
        return object;
    }

    private static normalizeField(value: string[] | string, type: string) {
        if (Array.isArray(value)) {
            return value.map(vl => ObjectAssistant.normalizeField(vl, type));
        } else {
            switch (type) {
                case 'number': return Number(value);
                case 'date': return new Date(value);
                case 'id': return ObjectAssistant.getUrlId(value);
                default: return value;
            }
        }
    }

    public static normalizeFields(object: ObjectBase, fields: string[], type: string) {
        fields.forEach(field => {
            object[field] = ObjectAssistant.normalizeField(object[field], type);
        });
        return object;
    }
}

function changeObjectSchema(object: any, propertyConverter: (propertyName: string) => string): any {
    if (object === null || object === undefined) {
        return object;
    }

    if (typeof object !== 'object') {
        return object;
    }

    if (isPrimitiveWrapper(object)) {
        return object;
    }

    if (Array.isArray(object)) {
        return object.map(innerObj => changeObjectSchema(innerObj, propertyConverter));
    }

    const clone = {};
    for (const key of Object.keys(object)) {
        clone[propertyConverter(key)] = isPrimitiveWrapper(object[key]) ?
            object[key] : changeObjectSchema(object[key], propertyConverter);
    }

    return clone;
}

function convertProperty(pname: string) {
    const pts = pname.split(/_/);
    return pts.map((p, i) => {
        if (i > 0) {
            p = p[0].toUpperCase() + p.substring(1);
        }
        return p;
    }).join('');
}

function isPrimitiveWrapper(object: any) {
    return (
        object instanceof String
        || object instanceof Number
        || object instanceof Date
        || object instanceof Symbol
    );
}

@Injectable()
export class Api {
    constructor(
        private http: HttpClient
    ) { }

    private base = 'api/';

    private prepareOptions(options: { [key: string]: string | null | undefined }) {
        const res = {};
        Object.keys(options || {}).forEach(key => {
            if (options[key] !== undefined && options[key] !== null) {
                res[key] = options[key];
            }
        });
        return res;
    }

    private normalizeObject<TItem extends ObjectBase>(object: any): TItem {
        const res = ObjectAssistant.prepareObject(object);
        return res as TItem;
    }

    private normalizeArray<TItem extends ObjectBase>(objects: ListBase<TItem> | INotFound) {
        if ((objects as INotFound).detail) {
            return { results: [] };
        }
        const list = objects as ListBase<TItem>;
        list.results = list.results.map(item => this.normalizeObject<TItem>(item));
        return objects;
    }

    async get<TResponse extends ObjectBase>(url: string, options?: any, postprocessCb?: (item: TResponse) => TResponse) {
        const rurl = `${this.base}${url}`;
        return this.http.get(rurl, { params: this.prepareOptions(options) })
            .pipe(map((result: any) => this.normalizeObject<TResponse>(result)))
            .pipe(map((result: TResponse) => postprocessCb ? postprocessCb(result) : result))
            .toPromise();
    }

    async getList<TResponse extends ObjectBase>(url: string, options?: any, postprocessCb?: (item: TResponse) => TResponse) {
        const rurl = `${this.base}${url}`;
        return this.http.get(rurl, { params: this.prepareOptions(options) })
            .pipe(
                map((result: any) => this.normalizeArray<TResponse>(result)),
                map((result: ListBase<TResponse>) => {
                    if (postprocessCb) {
                        result.results.map(postprocessCb);
                    }
                    return result;
                })
            )
            .toPromise();
    }
}
