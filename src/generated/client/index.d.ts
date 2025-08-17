
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RouletteBet
 * 
 */
export type RouletteBet = $Result.DefaultSelection<Prisma.$RouletteBetPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BetType: {
  COLOR: 'COLOR',
  NUMBER: 'NUMBER'
};

export type BetType = (typeof BetType)[keyof typeof BetType]


export const BetStatus: {
  INIT: 'INIT',
  PLACED: 'PLACED',
  LOST: 'LOST',
  WON: 'WON',
  WON_AND_PAID: 'WON_AND_PAID'
};

export type BetStatus = (typeof BetStatus)[keyof typeof BetStatus]

}

export type BetType = $Enums.BetType

export const BetType: typeof $Enums.BetType

export type BetStatus = $Enums.BetStatus

export const BetStatus: typeof $Enums.BetStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RouletteBets
 * const rouletteBets = await prisma.rouletteBet.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RouletteBets
   * const rouletteBets = await prisma.rouletteBet.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.rouletteBet`: Exposes CRUD operations for the **RouletteBet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RouletteBets
    * const rouletteBets = await prisma.rouletteBet.findMany()
    * ```
    */
  get rouletteBet(): Prisma.RouletteBetDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RouletteBet: 'RouletteBet'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "rouletteBet"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RouletteBet: {
        payload: Prisma.$RouletteBetPayload<ExtArgs>
        fields: Prisma.RouletteBetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RouletteBetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RouletteBetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>
          }
          findFirst: {
            args: Prisma.RouletteBetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RouletteBetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>
          }
          findMany: {
            args: Prisma.RouletteBetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>[]
          }
          create: {
            args: Prisma.RouletteBetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>
          }
          createMany: {
            args: Prisma.RouletteBetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RouletteBetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>[]
          }
          delete: {
            args: Prisma.RouletteBetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>
          }
          update: {
            args: Prisma.RouletteBetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>
          }
          deleteMany: {
            args: Prisma.RouletteBetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RouletteBetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RouletteBetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RouletteBetPayload>
          }
          aggregate: {
            args: Prisma.RouletteBetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRouletteBet>
          }
          groupBy: {
            args: Prisma.RouletteBetGroupByArgs<ExtArgs>
            result: $Utils.Optional<RouletteBetGroupByOutputType>[]
          }
          count: {
            args: Prisma.RouletteBetCountArgs<ExtArgs>
            result: $Utils.Optional<RouletteBetCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model RouletteBet
   */

  export type AggregateRouletteBet = {
    _count: RouletteBetCountAggregateOutputType | null
    _avg: RouletteBetAvgAggregateOutputType | null
    _sum: RouletteBetSumAggregateOutputType | null
    _min: RouletteBetMinAggregateOutputType | null
    _max: RouletteBetMaxAggregateOutputType | null
  }

  export type RouletteBetAvgAggregateOutputType = {
    amountInSats: number | null
    blockHeight: number | null
  }

  export type RouletteBetSumAggregateOutputType = {
    amountInSats: number | null
    blockHeight: number | null
  }

  export type RouletteBetMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    betType: $Enums.BetType | null
    bet: string | null
    amountInSats: number | null
    userNpub: string | null
    eventId: string | null
    playerLightningAddress: string | null
    status: $Enums.BetStatus | null
    blockHeight: number | null
    paymentHash: string | null
    paymentRequest: string | null
    invoicePaid: boolean | null
    paidAt: Date | null
  }

  export type RouletteBetMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    betType: $Enums.BetType | null
    bet: string | null
    amountInSats: number | null
    userNpub: string | null
    eventId: string | null
    playerLightningAddress: string | null
    status: $Enums.BetStatus | null
    blockHeight: number | null
    paymentHash: string | null
    paymentRequest: string | null
    invoicePaid: boolean | null
    paidAt: Date | null
  }

  export type RouletteBetCountAggregateOutputType = {
    id: number
    createdAt: number
    betType: number
    bet: number
    amountInSats: number
    userNpub: number
    eventId: number
    playerLightningAddress: number
    status: number
    blockHeight: number
    paymentHash: number
    paymentRequest: number
    invoicePaid: number
    paidAt: number
    _all: number
  }


  export type RouletteBetAvgAggregateInputType = {
    amountInSats?: true
    blockHeight?: true
  }

  export type RouletteBetSumAggregateInputType = {
    amountInSats?: true
    blockHeight?: true
  }

  export type RouletteBetMinAggregateInputType = {
    id?: true
    createdAt?: true
    betType?: true
    bet?: true
    amountInSats?: true
    userNpub?: true
    eventId?: true
    playerLightningAddress?: true
    status?: true
    blockHeight?: true
    paymentHash?: true
    paymentRequest?: true
    invoicePaid?: true
    paidAt?: true
  }

  export type RouletteBetMaxAggregateInputType = {
    id?: true
    createdAt?: true
    betType?: true
    bet?: true
    amountInSats?: true
    userNpub?: true
    eventId?: true
    playerLightningAddress?: true
    status?: true
    blockHeight?: true
    paymentHash?: true
    paymentRequest?: true
    invoicePaid?: true
    paidAt?: true
  }

  export type RouletteBetCountAggregateInputType = {
    id?: true
    createdAt?: true
    betType?: true
    bet?: true
    amountInSats?: true
    userNpub?: true
    eventId?: true
    playerLightningAddress?: true
    status?: true
    blockHeight?: true
    paymentHash?: true
    paymentRequest?: true
    invoicePaid?: true
    paidAt?: true
    _all?: true
  }

  export type RouletteBetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RouletteBet to aggregate.
     */
    where?: RouletteBetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouletteBets to fetch.
     */
    orderBy?: RouletteBetOrderByWithRelationInput | RouletteBetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RouletteBetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouletteBets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouletteBets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RouletteBets
    **/
    _count?: true | RouletteBetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RouletteBetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RouletteBetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RouletteBetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RouletteBetMaxAggregateInputType
  }

  export type GetRouletteBetAggregateType<T extends RouletteBetAggregateArgs> = {
        [P in keyof T & keyof AggregateRouletteBet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRouletteBet[P]>
      : GetScalarType<T[P], AggregateRouletteBet[P]>
  }




  export type RouletteBetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RouletteBetWhereInput
    orderBy?: RouletteBetOrderByWithAggregationInput | RouletteBetOrderByWithAggregationInput[]
    by: RouletteBetScalarFieldEnum[] | RouletteBetScalarFieldEnum
    having?: RouletteBetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RouletteBetCountAggregateInputType | true
    _avg?: RouletteBetAvgAggregateInputType
    _sum?: RouletteBetSumAggregateInputType
    _min?: RouletteBetMinAggregateInputType
    _max?: RouletteBetMaxAggregateInputType
  }

  export type RouletteBetGroupByOutputType = {
    id: string
    createdAt: Date
    betType: $Enums.BetType
    bet: string
    amountInSats: number
    userNpub: string
    eventId: string
    playerLightningAddress: string
    status: $Enums.BetStatus
    blockHeight: number | null
    paymentHash: string | null
    paymentRequest: string | null
    invoicePaid: boolean
    paidAt: Date | null
    _count: RouletteBetCountAggregateOutputType | null
    _avg: RouletteBetAvgAggregateOutputType | null
    _sum: RouletteBetSumAggregateOutputType | null
    _min: RouletteBetMinAggregateOutputType | null
    _max: RouletteBetMaxAggregateOutputType | null
  }

  type GetRouletteBetGroupByPayload<T extends RouletteBetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RouletteBetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RouletteBetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RouletteBetGroupByOutputType[P]>
            : GetScalarType<T[P], RouletteBetGroupByOutputType[P]>
        }
      >
    >


  export type RouletteBetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    betType?: boolean
    bet?: boolean
    amountInSats?: boolean
    userNpub?: boolean
    eventId?: boolean
    playerLightningAddress?: boolean
    status?: boolean
    blockHeight?: boolean
    paymentHash?: boolean
    paymentRequest?: boolean
    invoicePaid?: boolean
    paidAt?: boolean
  }, ExtArgs["result"]["rouletteBet"]>

  export type RouletteBetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    betType?: boolean
    bet?: boolean
    amountInSats?: boolean
    userNpub?: boolean
    eventId?: boolean
    playerLightningAddress?: boolean
    status?: boolean
    blockHeight?: boolean
    paymentHash?: boolean
    paymentRequest?: boolean
    invoicePaid?: boolean
    paidAt?: boolean
  }, ExtArgs["result"]["rouletteBet"]>

  export type RouletteBetSelectScalar = {
    id?: boolean
    createdAt?: boolean
    betType?: boolean
    bet?: boolean
    amountInSats?: boolean
    userNpub?: boolean
    eventId?: boolean
    playerLightningAddress?: boolean
    status?: boolean
    blockHeight?: boolean
    paymentHash?: boolean
    paymentRequest?: boolean
    invoicePaid?: boolean
    paidAt?: boolean
  }


  export type $RouletteBetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RouletteBet"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      betType: $Enums.BetType
      bet: string
      amountInSats: number
      userNpub: string
      eventId: string
      playerLightningAddress: string
      status: $Enums.BetStatus
      blockHeight: number | null
      paymentHash: string | null
      paymentRequest: string | null
      invoicePaid: boolean
      paidAt: Date | null
    }, ExtArgs["result"]["rouletteBet"]>
    composites: {}
  }

  type RouletteBetGetPayload<S extends boolean | null | undefined | RouletteBetDefaultArgs> = $Result.GetResult<Prisma.$RouletteBetPayload, S>

  type RouletteBetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RouletteBetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RouletteBetCountAggregateInputType | true
    }

  export interface RouletteBetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RouletteBet'], meta: { name: 'RouletteBet' } }
    /**
     * Find zero or one RouletteBet that matches the filter.
     * @param {RouletteBetFindUniqueArgs} args - Arguments to find a RouletteBet
     * @example
     * // Get one RouletteBet
     * const rouletteBet = await prisma.rouletteBet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RouletteBetFindUniqueArgs>(args: SelectSubset<T, RouletteBetFindUniqueArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RouletteBet that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RouletteBetFindUniqueOrThrowArgs} args - Arguments to find a RouletteBet
     * @example
     * // Get one RouletteBet
     * const rouletteBet = await prisma.rouletteBet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RouletteBetFindUniqueOrThrowArgs>(args: SelectSubset<T, RouletteBetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RouletteBet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetFindFirstArgs} args - Arguments to find a RouletteBet
     * @example
     * // Get one RouletteBet
     * const rouletteBet = await prisma.rouletteBet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RouletteBetFindFirstArgs>(args?: SelectSubset<T, RouletteBetFindFirstArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RouletteBet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetFindFirstOrThrowArgs} args - Arguments to find a RouletteBet
     * @example
     * // Get one RouletteBet
     * const rouletteBet = await prisma.rouletteBet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RouletteBetFindFirstOrThrowArgs>(args?: SelectSubset<T, RouletteBetFindFirstOrThrowArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RouletteBets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RouletteBets
     * const rouletteBets = await prisma.rouletteBet.findMany()
     * 
     * // Get first 10 RouletteBets
     * const rouletteBets = await prisma.rouletteBet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rouletteBetWithIdOnly = await prisma.rouletteBet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RouletteBetFindManyArgs>(args?: SelectSubset<T, RouletteBetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RouletteBet.
     * @param {RouletteBetCreateArgs} args - Arguments to create a RouletteBet.
     * @example
     * // Create one RouletteBet
     * const RouletteBet = await prisma.rouletteBet.create({
     *   data: {
     *     // ... data to create a RouletteBet
     *   }
     * })
     * 
     */
    create<T extends RouletteBetCreateArgs>(args: SelectSubset<T, RouletteBetCreateArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RouletteBets.
     * @param {RouletteBetCreateManyArgs} args - Arguments to create many RouletteBets.
     * @example
     * // Create many RouletteBets
     * const rouletteBet = await prisma.rouletteBet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RouletteBetCreateManyArgs>(args?: SelectSubset<T, RouletteBetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RouletteBets and returns the data saved in the database.
     * @param {RouletteBetCreateManyAndReturnArgs} args - Arguments to create many RouletteBets.
     * @example
     * // Create many RouletteBets
     * const rouletteBet = await prisma.rouletteBet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RouletteBets and only return the `id`
     * const rouletteBetWithIdOnly = await prisma.rouletteBet.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RouletteBetCreateManyAndReturnArgs>(args?: SelectSubset<T, RouletteBetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RouletteBet.
     * @param {RouletteBetDeleteArgs} args - Arguments to delete one RouletteBet.
     * @example
     * // Delete one RouletteBet
     * const RouletteBet = await prisma.rouletteBet.delete({
     *   where: {
     *     // ... filter to delete one RouletteBet
     *   }
     * })
     * 
     */
    delete<T extends RouletteBetDeleteArgs>(args: SelectSubset<T, RouletteBetDeleteArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RouletteBet.
     * @param {RouletteBetUpdateArgs} args - Arguments to update one RouletteBet.
     * @example
     * // Update one RouletteBet
     * const rouletteBet = await prisma.rouletteBet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RouletteBetUpdateArgs>(args: SelectSubset<T, RouletteBetUpdateArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RouletteBets.
     * @param {RouletteBetDeleteManyArgs} args - Arguments to filter RouletteBets to delete.
     * @example
     * // Delete a few RouletteBets
     * const { count } = await prisma.rouletteBet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RouletteBetDeleteManyArgs>(args?: SelectSubset<T, RouletteBetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RouletteBets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RouletteBets
     * const rouletteBet = await prisma.rouletteBet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RouletteBetUpdateManyArgs>(args: SelectSubset<T, RouletteBetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RouletteBet.
     * @param {RouletteBetUpsertArgs} args - Arguments to update or create a RouletteBet.
     * @example
     * // Update or create a RouletteBet
     * const rouletteBet = await prisma.rouletteBet.upsert({
     *   create: {
     *     // ... data to create a RouletteBet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RouletteBet we want to update
     *   }
     * })
     */
    upsert<T extends RouletteBetUpsertArgs>(args: SelectSubset<T, RouletteBetUpsertArgs<ExtArgs>>): Prisma__RouletteBetClient<$Result.GetResult<Prisma.$RouletteBetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RouletteBets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetCountArgs} args - Arguments to filter RouletteBets to count.
     * @example
     * // Count the number of RouletteBets
     * const count = await prisma.rouletteBet.count({
     *   where: {
     *     // ... the filter for the RouletteBets we want to count
     *   }
     * })
    **/
    count<T extends RouletteBetCountArgs>(
      args?: Subset<T, RouletteBetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RouletteBetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RouletteBet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RouletteBetAggregateArgs>(args: Subset<T, RouletteBetAggregateArgs>): Prisma.PrismaPromise<GetRouletteBetAggregateType<T>>

    /**
     * Group by RouletteBet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RouletteBetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RouletteBetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RouletteBetGroupByArgs['orderBy'] }
        : { orderBy?: RouletteBetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RouletteBetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRouletteBetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RouletteBet model
   */
  readonly fields: RouletteBetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RouletteBet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RouletteBetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RouletteBet model
   */ 
  interface RouletteBetFieldRefs {
    readonly id: FieldRef<"RouletteBet", 'String'>
    readonly createdAt: FieldRef<"RouletteBet", 'DateTime'>
    readonly betType: FieldRef<"RouletteBet", 'BetType'>
    readonly bet: FieldRef<"RouletteBet", 'String'>
    readonly amountInSats: FieldRef<"RouletteBet", 'Int'>
    readonly userNpub: FieldRef<"RouletteBet", 'String'>
    readonly eventId: FieldRef<"RouletteBet", 'String'>
    readonly playerLightningAddress: FieldRef<"RouletteBet", 'String'>
    readonly status: FieldRef<"RouletteBet", 'BetStatus'>
    readonly blockHeight: FieldRef<"RouletteBet", 'Int'>
    readonly paymentHash: FieldRef<"RouletteBet", 'String'>
    readonly paymentRequest: FieldRef<"RouletteBet", 'String'>
    readonly invoicePaid: FieldRef<"RouletteBet", 'Boolean'>
    readonly paidAt: FieldRef<"RouletteBet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RouletteBet findUnique
   */
  export type RouletteBetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * Filter, which RouletteBet to fetch.
     */
    where: RouletteBetWhereUniqueInput
  }

  /**
   * RouletteBet findUniqueOrThrow
   */
  export type RouletteBetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * Filter, which RouletteBet to fetch.
     */
    where: RouletteBetWhereUniqueInput
  }

  /**
   * RouletteBet findFirst
   */
  export type RouletteBetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * Filter, which RouletteBet to fetch.
     */
    where?: RouletteBetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouletteBets to fetch.
     */
    orderBy?: RouletteBetOrderByWithRelationInput | RouletteBetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RouletteBets.
     */
    cursor?: RouletteBetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouletteBets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouletteBets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RouletteBets.
     */
    distinct?: RouletteBetScalarFieldEnum | RouletteBetScalarFieldEnum[]
  }

  /**
   * RouletteBet findFirstOrThrow
   */
  export type RouletteBetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * Filter, which RouletteBet to fetch.
     */
    where?: RouletteBetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouletteBets to fetch.
     */
    orderBy?: RouletteBetOrderByWithRelationInput | RouletteBetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RouletteBets.
     */
    cursor?: RouletteBetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouletteBets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouletteBets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RouletteBets.
     */
    distinct?: RouletteBetScalarFieldEnum | RouletteBetScalarFieldEnum[]
  }

  /**
   * RouletteBet findMany
   */
  export type RouletteBetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * Filter, which RouletteBets to fetch.
     */
    where?: RouletteBetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RouletteBets to fetch.
     */
    orderBy?: RouletteBetOrderByWithRelationInput | RouletteBetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RouletteBets.
     */
    cursor?: RouletteBetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RouletteBets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RouletteBets.
     */
    skip?: number
    distinct?: RouletteBetScalarFieldEnum | RouletteBetScalarFieldEnum[]
  }

  /**
   * RouletteBet create
   */
  export type RouletteBetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * The data needed to create a RouletteBet.
     */
    data: XOR<RouletteBetCreateInput, RouletteBetUncheckedCreateInput>
  }

  /**
   * RouletteBet createMany
   */
  export type RouletteBetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RouletteBets.
     */
    data: RouletteBetCreateManyInput | RouletteBetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RouletteBet createManyAndReturn
   */
  export type RouletteBetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RouletteBets.
     */
    data: RouletteBetCreateManyInput | RouletteBetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RouletteBet update
   */
  export type RouletteBetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * The data needed to update a RouletteBet.
     */
    data: XOR<RouletteBetUpdateInput, RouletteBetUncheckedUpdateInput>
    /**
     * Choose, which RouletteBet to update.
     */
    where: RouletteBetWhereUniqueInput
  }

  /**
   * RouletteBet updateMany
   */
  export type RouletteBetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RouletteBets.
     */
    data: XOR<RouletteBetUpdateManyMutationInput, RouletteBetUncheckedUpdateManyInput>
    /**
     * Filter which RouletteBets to update
     */
    where?: RouletteBetWhereInput
  }

  /**
   * RouletteBet upsert
   */
  export type RouletteBetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * The filter to search for the RouletteBet to update in case it exists.
     */
    where: RouletteBetWhereUniqueInput
    /**
     * In case the RouletteBet found by the `where` argument doesn't exist, create a new RouletteBet with this data.
     */
    create: XOR<RouletteBetCreateInput, RouletteBetUncheckedCreateInput>
    /**
     * In case the RouletteBet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RouletteBetUpdateInput, RouletteBetUncheckedUpdateInput>
  }

  /**
   * RouletteBet delete
   */
  export type RouletteBetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
    /**
     * Filter which RouletteBet to delete.
     */
    where: RouletteBetWhereUniqueInput
  }

  /**
   * RouletteBet deleteMany
   */
  export type RouletteBetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RouletteBets to delete
     */
    where?: RouletteBetWhereInput
  }

  /**
   * RouletteBet without action
   */
  export type RouletteBetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RouletteBet
     */
    select?: RouletteBetSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RouletteBetScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    betType: 'betType',
    bet: 'bet',
    amountInSats: 'amountInSats',
    userNpub: 'userNpub',
    eventId: 'eventId',
    playerLightningAddress: 'playerLightningAddress',
    status: 'status',
    blockHeight: 'blockHeight',
    paymentHash: 'paymentHash',
    paymentRequest: 'paymentRequest',
    invoicePaid: 'invoicePaid',
    paidAt: 'paidAt'
  };

  export type RouletteBetScalarFieldEnum = (typeof RouletteBetScalarFieldEnum)[keyof typeof RouletteBetScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BetType'
   */
  export type EnumBetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BetType'>
    


  /**
   * Reference to a field of type 'BetType[]'
   */
  export type ListEnumBetTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BetType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BetStatus'
   */
  export type EnumBetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BetStatus'>
    


  /**
   * Reference to a field of type 'BetStatus[]'
   */
  export type ListEnumBetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BetStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RouletteBetWhereInput = {
    AND?: RouletteBetWhereInput | RouletteBetWhereInput[]
    OR?: RouletteBetWhereInput[]
    NOT?: RouletteBetWhereInput | RouletteBetWhereInput[]
    id?: StringFilter<"RouletteBet"> | string
    createdAt?: DateTimeFilter<"RouletteBet"> | Date | string
    betType?: EnumBetTypeFilter<"RouletteBet"> | $Enums.BetType
    bet?: StringFilter<"RouletteBet"> | string
    amountInSats?: IntFilter<"RouletteBet"> | number
    userNpub?: StringFilter<"RouletteBet"> | string
    eventId?: StringFilter<"RouletteBet"> | string
    playerLightningAddress?: StringFilter<"RouletteBet"> | string
    status?: EnumBetStatusFilter<"RouletteBet"> | $Enums.BetStatus
    blockHeight?: IntNullableFilter<"RouletteBet"> | number | null
    paymentHash?: StringNullableFilter<"RouletteBet"> | string | null
    paymentRequest?: StringNullableFilter<"RouletteBet"> | string | null
    invoicePaid?: BoolFilter<"RouletteBet"> | boolean
    paidAt?: DateTimeNullableFilter<"RouletteBet"> | Date | string | null
  }

  export type RouletteBetOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    betType?: SortOrder
    bet?: SortOrder
    amountInSats?: SortOrder
    userNpub?: SortOrder
    eventId?: SortOrder
    playerLightningAddress?: SortOrder
    status?: SortOrder
    blockHeight?: SortOrderInput | SortOrder
    paymentHash?: SortOrderInput | SortOrder
    paymentRequest?: SortOrderInput | SortOrder
    invoicePaid?: SortOrder
    paidAt?: SortOrderInput | SortOrder
  }

  export type RouletteBetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId?: string
    paymentHash?: string
    AND?: RouletteBetWhereInput | RouletteBetWhereInput[]
    OR?: RouletteBetWhereInput[]
    NOT?: RouletteBetWhereInput | RouletteBetWhereInput[]
    createdAt?: DateTimeFilter<"RouletteBet"> | Date | string
    betType?: EnumBetTypeFilter<"RouletteBet"> | $Enums.BetType
    bet?: StringFilter<"RouletteBet"> | string
    amountInSats?: IntFilter<"RouletteBet"> | number
    userNpub?: StringFilter<"RouletteBet"> | string
    playerLightningAddress?: StringFilter<"RouletteBet"> | string
    status?: EnumBetStatusFilter<"RouletteBet"> | $Enums.BetStatus
    blockHeight?: IntNullableFilter<"RouletteBet"> | number | null
    paymentRequest?: StringNullableFilter<"RouletteBet"> | string | null
    invoicePaid?: BoolFilter<"RouletteBet"> | boolean
    paidAt?: DateTimeNullableFilter<"RouletteBet"> | Date | string | null
  }, "id" | "eventId" | "paymentHash">

  export type RouletteBetOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    betType?: SortOrder
    bet?: SortOrder
    amountInSats?: SortOrder
    userNpub?: SortOrder
    eventId?: SortOrder
    playerLightningAddress?: SortOrder
    status?: SortOrder
    blockHeight?: SortOrderInput | SortOrder
    paymentHash?: SortOrderInput | SortOrder
    paymentRequest?: SortOrderInput | SortOrder
    invoicePaid?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    _count?: RouletteBetCountOrderByAggregateInput
    _avg?: RouletteBetAvgOrderByAggregateInput
    _max?: RouletteBetMaxOrderByAggregateInput
    _min?: RouletteBetMinOrderByAggregateInput
    _sum?: RouletteBetSumOrderByAggregateInput
  }

  export type RouletteBetScalarWhereWithAggregatesInput = {
    AND?: RouletteBetScalarWhereWithAggregatesInput | RouletteBetScalarWhereWithAggregatesInput[]
    OR?: RouletteBetScalarWhereWithAggregatesInput[]
    NOT?: RouletteBetScalarWhereWithAggregatesInput | RouletteBetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RouletteBet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RouletteBet"> | Date | string
    betType?: EnumBetTypeWithAggregatesFilter<"RouletteBet"> | $Enums.BetType
    bet?: StringWithAggregatesFilter<"RouletteBet"> | string
    amountInSats?: IntWithAggregatesFilter<"RouletteBet"> | number
    userNpub?: StringWithAggregatesFilter<"RouletteBet"> | string
    eventId?: StringWithAggregatesFilter<"RouletteBet"> | string
    playerLightningAddress?: StringWithAggregatesFilter<"RouletteBet"> | string
    status?: EnumBetStatusWithAggregatesFilter<"RouletteBet"> | $Enums.BetStatus
    blockHeight?: IntNullableWithAggregatesFilter<"RouletteBet"> | number | null
    paymentHash?: StringNullableWithAggregatesFilter<"RouletteBet"> | string | null
    paymentRequest?: StringNullableWithAggregatesFilter<"RouletteBet"> | string | null
    invoicePaid?: BoolWithAggregatesFilter<"RouletteBet"> | boolean
    paidAt?: DateTimeNullableWithAggregatesFilter<"RouletteBet"> | Date | string | null
  }

  export type RouletteBetCreateInput = {
    id?: string
    createdAt?: Date | string
    betType: $Enums.BetType
    bet: string
    amountInSats: number
    userNpub: string
    eventId: string
    playerLightningAddress: string
    status?: $Enums.BetStatus
    blockHeight?: number | null
    paymentHash?: string | null
    paymentRequest?: string | null
    invoicePaid?: boolean
    paidAt?: Date | string | null
  }

  export type RouletteBetUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    betType: $Enums.BetType
    bet: string
    amountInSats: number
    userNpub: string
    eventId: string
    playerLightningAddress: string
    status?: $Enums.BetStatus
    blockHeight?: number | null
    paymentHash?: string | null
    paymentRequest?: string | null
    invoicePaid?: boolean
    paidAt?: Date | string | null
  }

  export type RouletteBetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    betType?: EnumBetTypeFieldUpdateOperationsInput | $Enums.BetType
    bet?: StringFieldUpdateOperationsInput | string
    amountInSats?: IntFieldUpdateOperationsInput | number
    userNpub?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    playerLightningAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumBetStatusFieldUpdateOperationsInput | $Enums.BetStatus
    blockHeight?: NullableIntFieldUpdateOperationsInput | number | null
    paymentHash?: NullableStringFieldUpdateOperationsInput | string | null
    paymentRequest?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RouletteBetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    betType?: EnumBetTypeFieldUpdateOperationsInput | $Enums.BetType
    bet?: StringFieldUpdateOperationsInput | string
    amountInSats?: IntFieldUpdateOperationsInput | number
    userNpub?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    playerLightningAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumBetStatusFieldUpdateOperationsInput | $Enums.BetStatus
    blockHeight?: NullableIntFieldUpdateOperationsInput | number | null
    paymentHash?: NullableStringFieldUpdateOperationsInput | string | null
    paymentRequest?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RouletteBetCreateManyInput = {
    id?: string
    createdAt?: Date | string
    betType: $Enums.BetType
    bet: string
    amountInSats: number
    userNpub: string
    eventId: string
    playerLightningAddress: string
    status?: $Enums.BetStatus
    blockHeight?: number | null
    paymentHash?: string | null
    paymentRequest?: string | null
    invoicePaid?: boolean
    paidAt?: Date | string | null
  }

  export type RouletteBetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    betType?: EnumBetTypeFieldUpdateOperationsInput | $Enums.BetType
    bet?: StringFieldUpdateOperationsInput | string
    amountInSats?: IntFieldUpdateOperationsInput | number
    userNpub?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    playerLightningAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumBetStatusFieldUpdateOperationsInput | $Enums.BetStatus
    blockHeight?: NullableIntFieldUpdateOperationsInput | number | null
    paymentHash?: NullableStringFieldUpdateOperationsInput | string | null
    paymentRequest?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RouletteBetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    betType?: EnumBetTypeFieldUpdateOperationsInput | $Enums.BetType
    bet?: StringFieldUpdateOperationsInput | string
    amountInSats?: IntFieldUpdateOperationsInput | number
    userNpub?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    playerLightningAddress?: StringFieldUpdateOperationsInput | string
    status?: EnumBetStatusFieldUpdateOperationsInput | $Enums.BetStatus
    blockHeight?: NullableIntFieldUpdateOperationsInput | number | null
    paymentHash?: NullableStringFieldUpdateOperationsInput | string | null
    paymentRequest?: NullableStringFieldUpdateOperationsInput | string | null
    invoicePaid?: BoolFieldUpdateOperationsInput | boolean
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumBetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BetType | EnumBetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBetTypeFilter<$PrismaModel> | $Enums.BetType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumBetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BetStatus | EnumBetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBetStatusFilter<$PrismaModel> | $Enums.BetStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RouletteBetCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    betType?: SortOrder
    bet?: SortOrder
    amountInSats?: SortOrder
    userNpub?: SortOrder
    eventId?: SortOrder
    playerLightningAddress?: SortOrder
    status?: SortOrder
    blockHeight?: SortOrder
    paymentHash?: SortOrder
    paymentRequest?: SortOrder
    invoicePaid?: SortOrder
    paidAt?: SortOrder
  }

  export type RouletteBetAvgOrderByAggregateInput = {
    amountInSats?: SortOrder
    blockHeight?: SortOrder
  }

  export type RouletteBetMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    betType?: SortOrder
    bet?: SortOrder
    amountInSats?: SortOrder
    userNpub?: SortOrder
    eventId?: SortOrder
    playerLightningAddress?: SortOrder
    status?: SortOrder
    blockHeight?: SortOrder
    paymentHash?: SortOrder
    paymentRequest?: SortOrder
    invoicePaid?: SortOrder
    paidAt?: SortOrder
  }

  export type RouletteBetMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    betType?: SortOrder
    bet?: SortOrder
    amountInSats?: SortOrder
    userNpub?: SortOrder
    eventId?: SortOrder
    playerLightningAddress?: SortOrder
    status?: SortOrder
    blockHeight?: SortOrder
    paymentHash?: SortOrder
    paymentRequest?: SortOrder
    invoicePaid?: SortOrder
    paidAt?: SortOrder
  }

  export type RouletteBetSumOrderByAggregateInput = {
    amountInSats?: SortOrder
    blockHeight?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumBetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BetType | EnumBetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBetTypeWithAggregatesFilter<$PrismaModel> | $Enums.BetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBetTypeFilter<$PrismaModel>
    _max?: NestedEnumBetTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumBetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BetStatus | EnumBetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBetStatusWithAggregatesFilter<$PrismaModel> | $Enums.BetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBetStatusFilter<$PrismaModel>
    _max?: NestedEnumBetStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumBetTypeFieldUpdateOperationsInput = {
    set?: $Enums.BetType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumBetStatusFieldUpdateOperationsInput = {
    set?: $Enums.BetStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumBetTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BetType | EnumBetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBetTypeFilter<$PrismaModel> | $Enums.BetType
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumBetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BetStatus | EnumBetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBetStatusFilter<$PrismaModel> | $Enums.BetStatus
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumBetTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BetType | EnumBetTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetType[] | ListEnumBetTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBetTypeWithAggregatesFilter<$PrismaModel> | $Enums.BetType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBetTypeFilter<$PrismaModel>
    _max?: NestedEnumBetTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumBetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BetStatus | EnumBetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BetStatus[] | ListEnumBetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBetStatusWithAggregatesFilter<$PrismaModel> | $Enums.BetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBetStatusFilter<$PrismaModel>
    _max?: NestedEnumBetStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use RouletteBetDefaultArgs instead
     */
    export type RouletteBetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RouletteBetDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}