import { User } from 'src/users/schemas/users.schema';
import { Category } from 'src/categories/schemas/categories.schema';
import { Product } from 'src/products/schemas/products.schema';
import { Order } from 'src/orders/schemas/orders.schema';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type SelectFields<T> = (`${'-'|''}${keyof T}`)[];
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & { [K in Keys]-?:
        Required<Pick<T, K>>
        & Partial<Record<Exclude<Keys, K>, undefined>>
    }[Keys]

export type UserCriteria = Partial<User>;
export type CreateUserOptions = Omit<User, '_id'>;

export type CategoryCriteria = Partial<Category>;
export type CreateCategoryOptions = Omit<Category, '_id'>;

export type ProductCriteria = Partial<Product>;
export type CreateProductOptions = Omit<Product, '_id'>;

export type OrderCriteria = Partial<Order>;
export type CreateOrderOptions = Omit<Order, '_id'>;
