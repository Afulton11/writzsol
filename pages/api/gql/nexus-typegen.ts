import * as ContextModule from "./services/context"

import { FieldAuthorizeResolver } from "@nexus/schema/dist/plugins/fieldAuthorizePlugin"
import { core } from "@nexus/schema"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "DateTime";
    json<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Json";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Json";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  DateTimeFieldUpdateOperationsInput: { // input type
    set?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  DateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  EnumRoleFieldUpdateOperationsInput: { // input type
    set?: NexusGenEnums['Role'] | null; // Role
  }
  EnumWebsiteStatusFieldUpdateOperationsInput: { // input type
    set?: NexusGenEnums['WebsiteStatus'] | null; // WebsiteStatus
  }
  EnumWebsiteStatusFilter: { // input type
    equals?: NexusGenEnums['WebsiteStatus'] | null; // WebsiteStatus
    in?: NexusGenEnums['WebsiteStatus'][] | null; // [WebsiteStatus!]
    not?: NexusGenInputs['NestedEnumWebsiteStatusFilter'] | null; // NestedEnumWebsiteStatusFilter
    notIn?: NexusGenEnums['WebsiteStatus'][] | null; // [WebsiteStatus!]
  }
  IntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedDateTimeFilter: { // input type
    equals?: NexusGenScalars['DateTime'] | null; // DateTime
    gt?: NexusGenScalars['DateTime'] | null; // DateTime
    gte?: NexusGenScalars['DateTime'] | null; // DateTime
    in?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
    lt?: NexusGenScalars['DateTime'] | null; // DateTime
    lte?: NexusGenScalars['DateTime'] | null; // DateTime
    not?: NexusGenInputs['NestedDateTimeFilter'] | null; // NestedDateTimeFilter
    notIn?: NexusGenScalars['DateTime'][] | null; // [DateTime!]
  }
  NestedEnumWebsiteStatusFilter: { // input type
    equals?: NexusGenEnums['WebsiteStatus'] | null; // WebsiteStatus
    in?: NexusGenEnums['WebsiteStatus'][] | null; // [WebsiteStatus!]
    not?: NexusGenInputs['NestedEnumWebsiteStatusFilter'] | null; // NestedEnumWebsiteStatusFilter
    notIn?: NexusGenEnums['WebsiteStatus'][] | null; // [WebsiteStatus!]
  }
  NestedIntFilter: { // input type
    equals?: number | null; // Int
    gt?: number | null; // Int
    gte?: number | null; // Int
    in?: number[] | null; // [Int!]
    lt?: number | null; // Int
    lte?: number | null; // Int
    not?: NexusGenInputs['NestedIntFilter'] | null; // NestedIntFilter
    notIn?: number[] | null; // [Int!]
  }
  NestedStringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  NullableDateTimeFieldUpdateOperationsInput: { // input type
    set?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  NullableStringFieldUpdateOperationsInput: { // input type
    set?: string | null; // String
  }
  PageCreateInput: { // input type
    blocks: NexusGenScalars['Json']; // Json!
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    path: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    website: NexusGenInputs['WebsiteCreateOneWithoutPagesInput']; // WebsiteCreateOneWithoutPagesInput!
  }
  PageCreateManyWithoutWebsiteInput: { // input type
    connect?: NexusGenInputs['PageWhereUniqueInput'][] | null; // [PageWhereUniqueInput!]
    create?: NexusGenInputs['PageCreateWithoutWebsiteInput'][] | null; // [PageCreateWithoutWebsiteInput!]
  }
  PageCreateWithoutWebsiteInput: { // input type
    blocks: NexusGenScalars['Json']; // Json!
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    path: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  PageListRelationFilter: { // input type
    every?: NexusGenInputs['PageWhereInput'] | null; // PageWhereInput
    none?: NexusGenInputs['PageWhereInput'] | null; // PageWhereInput
    some?: NexusGenInputs['PageWhereInput'] | null; // PageWhereInput
  }
  PageScalarWhereInput: { // input type
    AND?: NexusGenInputs['PageScalarWhereInput'][] | null; // [PageScalarWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    NOT?: NexusGenInputs['PageScalarWhereInput'][] | null; // [PageScalarWhereInput!]
    OR?: NexusGenInputs['PageScalarWhereInput'][] | null; // [PageScalarWhereInput!]
    path?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    websiteId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  PageUpdateInput: { // input type
    blocks?: NexusGenScalars['Json'] | null; // Json
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    path?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    website?: NexusGenInputs['WebsiteUpdateOneRequiredWithoutPagesInput'] | null; // WebsiteUpdateOneRequiredWithoutPagesInput
  }
  PageUpdateManyDataInput: { // input type
    blocks?: NexusGenScalars['Json'] | null; // Json
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    path?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
  }
  PageUpdateManyWithWhereNestedInput: { // input type
    data: NexusGenInputs['PageUpdateManyDataInput']; // PageUpdateManyDataInput!
    where: NexusGenInputs['PageScalarWhereInput']; // PageScalarWhereInput!
  }
  PageUpdateManyWithoutWebsiteInput: { // input type
    connect?: NexusGenInputs['PageWhereUniqueInput'][] | null; // [PageWhereUniqueInput!]
    create?: NexusGenInputs['PageCreateWithoutWebsiteInput'][] | null; // [PageCreateWithoutWebsiteInput!]
    delete?: NexusGenInputs['PageWhereUniqueInput'][] | null; // [PageWhereUniqueInput!]
    deleteMany?: NexusGenInputs['PageScalarWhereInput'][] | null; // [PageScalarWhereInput!]
    disconnect?: NexusGenInputs['PageWhereUniqueInput'][] | null; // [PageWhereUniqueInput!]
    set?: NexusGenInputs['PageWhereUniqueInput'][] | null; // [PageWhereUniqueInput!]
    update?: NexusGenInputs['PageUpdateWithWhereUniqueWithoutWebsiteInput'][] | null; // [PageUpdateWithWhereUniqueWithoutWebsiteInput!]
    updateMany?: NexusGenInputs['PageUpdateManyWithWhereNestedInput'][] | null; // [PageUpdateManyWithWhereNestedInput!]
    upsert?: NexusGenInputs['PageUpsertWithWhereUniqueWithoutWebsiteInput'][] | null; // [PageUpsertWithWhereUniqueWithoutWebsiteInput!]
  }
  PageUpdateWithWhereUniqueWithoutWebsiteInput: { // input type
    data: NexusGenInputs['PageUpdateWithoutWebsiteDataInput']; // PageUpdateWithoutWebsiteDataInput!
    where: NexusGenInputs['PageWhereUniqueInput']; // PageWhereUniqueInput!
  }
  PageUpdateWithoutWebsiteDataInput: { // input type
    blocks?: NexusGenScalars['Json'] | null; // Json
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    path?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
  }
  PageUpsertWithWhereUniqueWithoutWebsiteInput: { // input type
    create: NexusGenInputs['PageCreateWithoutWebsiteInput']; // PageCreateWithoutWebsiteInput!
    update: NexusGenInputs['PageUpdateWithoutWebsiteDataInput']; // PageUpdateWithoutWebsiteDataInput!
    where: NexusGenInputs['PageWhereUniqueInput']; // PageWhereUniqueInput!
  }
  PageWhereInput: { // input type
    AND?: NexusGenInputs['PageWhereInput'][] | null; // [PageWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    NOT?: NexusGenInputs['PageWhereInput'][] | null; // [PageWhereInput!]
    OR?: NexusGenInputs['PageWhereInput'][] | null; // [PageWhereInput!]
    path?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    website?: NexusGenInputs['WebsiteWhereInput'] | null; // WebsiteWhereInput
    websiteId?: NexusGenInputs['IntFilter'] | null; // IntFilter
  }
  PageWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  StringFieldUpdateOperationsInput: { // input type
    set?: string | null; // String
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    mode?: NexusGenEnums['QueryMode'] | null; // QueryMode
    not?: NexusGenInputs['NestedStringFilter'] | null; // NestedStringFilter
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  UserUpdateInput: { // input type
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    email?: NexusGenInputs['NullableStringFieldUpdateOperationsInput'] | null; // NullableStringFieldUpdateOperationsInput
    emailVerified?: NexusGenInputs['NullableDateTimeFieldUpdateOperationsInput'] | null; // NullableDateTimeFieldUpdateOperationsInput
    image?: NexusGenInputs['NullableStringFieldUpdateOperationsInput'] | null; // NullableStringFieldUpdateOperationsInput
    name?: NexusGenInputs['NullableStringFieldUpdateOperationsInput'] | null; // NullableStringFieldUpdateOperationsInput
    role?: NexusGenInputs['EnumRoleFieldUpdateOperationsInput'] | null; // EnumRoleFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    websites?: NexusGenInputs['WebsiteUpdateManyWithoutUserInput'] | null; // WebsiteUpdateManyWithoutUserInput
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
  WebsiteCreateInput: { // input type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    defaultTheme: string; // String!
    location: string; // String!
    pages?: NexusGenInputs['PageCreateManyWithoutWebsiteInput'] | null; // PageCreateManyWithoutWebsiteInput
    status?: NexusGenEnums['WebsiteStatus'] | null; // WebsiteStatus
    title: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  WebsiteCreateOneWithoutPagesInput: { // input type
    connect?: NexusGenInputs['WebsiteWhereUniqueInput'] | null; // WebsiteWhereUniqueInput
    create?: NexusGenInputs['WebsiteCreateWithoutPagesInput'] | null; // WebsiteCreateWithoutPagesInput
  }
  WebsiteCreateWithoutPagesInput: { // input type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    defaultTheme: string; // String!
    location: string; // String!
    status?: NexusGenEnums['WebsiteStatus'] | null; // WebsiteStatus
    title: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  WebsiteCreateWithoutUserInput: { // input type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    defaultTheme: string; // String!
    location: string; // String!
    pages?: NexusGenInputs['PageCreateManyWithoutWebsiteInput'] | null; // PageCreateManyWithoutWebsiteInput
    status?: NexusGenEnums['WebsiteStatus'] | null; // WebsiteStatus
    title: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  WebsiteOrderByInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    defaultTheme?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    location?: NexusGenEnums['SortOrder'] | null; // SortOrder
    status?: NexusGenEnums['SortOrder'] | null; // SortOrder
    title?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  WebsiteScalarWhereInput: { // input type
    AND?: NexusGenInputs['WebsiteScalarWhereInput'][] | null; // [WebsiteScalarWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    defaultTheme?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    location?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['WebsiteScalarWhereInput'][] | null; // [WebsiteScalarWhereInput!]
    OR?: NexusGenInputs['WebsiteScalarWhereInput'][] | null; // [WebsiteScalarWhereInput!]
    status?: NexusGenInputs['EnumWebsiteStatusFilter'] | null; // EnumWebsiteStatusFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  WebsiteUpdateInput: { // input type
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    defaultTheme?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    location?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    pages?: NexusGenInputs['PageUpdateManyWithoutWebsiteInput'] | null; // PageUpdateManyWithoutWebsiteInput
    status?: NexusGenInputs['EnumWebsiteStatusFieldUpdateOperationsInput'] | null; // EnumWebsiteStatusFieldUpdateOperationsInput
    title?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
  }
  WebsiteUpdateManyDataInput: { // input type
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    defaultTheme?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    location?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    status?: NexusGenInputs['EnumWebsiteStatusFieldUpdateOperationsInput'] | null; // EnumWebsiteStatusFieldUpdateOperationsInput
    title?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
  }
  WebsiteUpdateManyWithWhereNestedInput: { // input type
    data: NexusGenInputs['WebsiteUpdateManyDataInput']; // WebsiteUpdateManyDataInput!
    where: NexusGenInputs['WebsiteScalarWhereInput']; // WebsiteScalarWhereInput!
  }
  WebsiteUpdateManyWithoutUserInput: { // input type
    connect?: NexusGenInputs['WebsiteWhereUniqueInput'][] | null; // [WebsiteWhereUniqueInput!]
    create?: NexusGenInputs['WebsiteCreateWithoutUserInput'][] | null; // [WebsiteCreateWithoutUserInput!]
    delete?: NexusGenInputs['WebsiteWhereUniqueInput'][] | null; // [WebsiteWhereUniqueInput!]
    deleteMany?: NexusGenInputs['WebsiteScalarWhereInput'][] | null; // [WebsiteScalarWhereInput!]
    disconnect?: NexusGenInputs['WebsiteWhereUniqueInput'][] | null; // [WebsiteWhereUniqueInput!]
    set?: NexusGenInputs['WebsiteWhereUniqueInput'][] | null; // [WebsiteWhereUniqueInput!]
    update?: NexusGenInputs['WebsiteUpdateWithWhereUniqueWithoutUserInput'][] | null; // [WebsiteUpdateWithWhereUniqueWithoutUserInput!]
    updateMany?: NexusGenInputs['WebsiteUpdateManyWithWhereNestedInput'][] | null; // [WebsiteUpdateManyWithWhereNestedInput!]
    upsert?: NexusGenInputs['WebsiteUpsertWithWhereUniqueWithoutUserInput'][] | null; // [WebsiteUpsertWithWhereUniqueWithoutUserInput!]
  }
  WebsiteUpdateOneRequiredWithoutPagesInput: { // input type
    connect?: NexusGenInputs['WebsiteWhereUniqueInput'] | null; // WebsiteWhereUniqueInput
    create?: NexusGenInputs['WebsiteCreateWithoutPagesInput'] | null; // WebsiteCreateWithoutPagesInput
    update?: NexusGenInputs['WebsiteUpdateWithoutPagesDataInput'] | null; // WebsiteUpdateWithoutPagesDataInput
    upsert?: NexusGenInputs['WebsiteUpsertWithoutPagesInput'] | null; // WebsiteUpsertWithoutPagesInput
  }
  WebsiteUpdateWithWhereUniqueWithoutUserInput: { // input type
    data: NexusGenInputs['WebsiteUpdateWithoutUserDataInput']; // WebsiteUpdateWithoutUserDataInput!
    where: NexusGenInputs['WebsiteWhereUniqueInput']; // WebsiteWhereUniqueInput!
  }
  WebsiteUpdateWithoutPagesDataInput: { // input type
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    defaultTheme?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    location?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    status?: NexusGenInputs['EnumWebsiteStatusFieldUpdateOperationsInput'] | null; // EnumWebsiteStatusFieldUpdateOperationsInput
    title?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
  }
  WebsiteUpdateWithoutUserDataInput: { // input type
    createdAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
    defaultTheme?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    location?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    pages?: NexusGenInputs['PageUpdateManyWithoutWebsiteInput'] | null; // PageUpdateManyWithoutWebsiteInput
    status?: NexusGenInputs['EnumWebsiteStatusFieldUpdateOperationsInput'] | null; // EnumWebsiteStatusFieldUpdateOperationsInput
    title?: NexusGenInputs['StringFieldUpdateOperationsInput'] | null; // StringFieldUpdateOperationsInput
    updatedAt?: NexusGenInputs['DateTimeFieldUpdateOperationsInput'] | null; // DateTimeFieldUpdateOperationsInput
  }
  WebsiteUpsertWithWhereUniqueWithoutUserInput: { // input type
    create: NexusGenInputs['WebsiteCreateWithoutUserInput']; // WebsiteCreateWithoutUserInput!
    update: NexusGenInputs['WebsiteUpdateWithoutUserDataInput']; // WebsiteUpdateWithoutUserDataInput!
    where: NexusGenInputs['WebsiteWhereUniqueInput']; // WebsiteWhereUniqueInput!
  }
  WebsiteUpsertWithoutPagesInput: { // input type
    create: NexusGenInputs['WebsiteCreateWithoutPagesInput']; // WebsiteCreateWithoutPagesInput!
    update: NexusGenInputs['WebsiteUpdateWithoutPagesDataInput']; // WebsiteUpdateWithoutPagesDataInput!
  }
  WebsiteWhereInput: { // input type
    AND?: NexusGenInputs['WebsiteWhereInput'][] | null; // [WebsiteWhereInput!]
    createdAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
    defaultTheme?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['IntFilter'] | null; // IntFilter
    location?: NexusGenInputs['StringFilter'] | null; // StringFilter
    NOT?: NexusGenInputs['WebsiteWhereInput'][] | null; // [WebsiteWhereInput!]
    OR?: NexusGenInputs['WebsiteWhereInput'][] | null; // [WebsiteWhereInput!]
    pages?: NexusGenInputs['PageListRelationFilter'] | null; // PageListRelationFilter
    status?: NexusGenInputs['EnumWebsiteStatusFilter'] | null; // EnumWebsiteStatusFilter
    title?: NexusGenInputs['StringFilter'] | null; // StringFilter
    updatedAt?: NexusGenInputs['DateTimeFilter'] | null; // DateTimeFilter
  }
  WebsiteWhereUniqueInput: { // input type
    id?: number | null; // Int
    location?: string | null; // String
    title?: string | null; // String
  }
}

export interface NexusGenEnums {
  QueryMode: "default" | "insensitive"
  Role: "ADMIN" | "DEVELOPER" | "USER"
  SortOrder: "asc" | "desc"
  WebsiteStatus: "PRIVATE" | "PUBLISHED"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  Json: any
}

export interface NexusGenRootTypes {
  Mutation: {};
  Page: { // root type
    blocks: NexusGenScalars['Json']; // Json!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    path: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email?: string | null; // String
    emailVerified?: NexusGenScalars['DateTime'] | null; // DateTime
    id: number; // Int!
    image?: string | null; // String
    name?: string | null; // String
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Website: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    defaultTheme: string; // String!
    id: number; // Int!
    location: string; // String!
    status: NexusGenEnums['WebsiteStatus']; // WebsiteStatus!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  DateTimeFieldUpdateOperationsInput: NexusGenInputs['DateTimeFieldUpdateOperationsInput'];
  DateTimeFilter: NexusGenInputs['DateTimeFilter'];
  EnumRoleFieldUpdateOperationsInput: NexusGenInputs['EnumRoleFieldUpdateOperationsInput'];
  EnumWebsiteStatusFieldUpdateOperationsInput: NexusGenInputs['EnumWebsiteStatusFieldUpdateOperationsInput'];
  EnumWebsiteStatusFilter: NexusGenInputs['EnumWebsiteStatusFilter'];
  IntFilter: NexusGenInputs['IntFilter'];
  NestedDateTimeFilter: NexusGenInputs['NestedDateTimeFilter'];
  NestedEnumWebsiteStatusFilter: NexusGenInputs['NestedEnumWebsiteStatusFilter'];
  NestedIntFilter: NexusGenInputs['NestedIntFilter'];
  NestedStringFilter: NexusGenInputs['NestedStringFilter'];
  NullableDateTimeFieldUpdateOperationsInput: NexusGenInputs['NullableDateTimeFieldUpdateOperationsInput'];
  NullableStringFieldUpdateOperationsInput: NexusGenInputs['NullableStringFieldUpdateOperationsInput'];
  PageCreateInput: NexusGenInputs['PageCreateInput'];
  PageCreateManyWithoutWebsiteInput: NexusGenInputs['PageCreateManyWithoutWebsiteInput'];
  PageCreateWithoutWebsiteInput: NexusGenInputs['PageCreateWithoutWebsiteInput'];
  PageListRelationFilter: NexusGenInputs['PageListRelationFilter'];
  PageScalarWhereInput: NexusGenInputs['PageScalarWhereInput'];
  PageUpdateInput: NexusGenInputs['PageUpdateInput'];
  PageUpdateManyDataInput: NexusGenInputs['PageUpdateManyDataInput'];
  PageUpdateManyWithWhereNestedInput: NexusGenInputs['PageUpdateManyWithWhereNestedInput'];
  PageUpdateManyWithoutWebsiteInput: NexusGenInputs['PageUpdateManyWithoutWebsiteInput'];
  PageUpdateWithWhereUniqueWithoutWebsiteInput: NexusGenInputs['PageUpdateWithWhereUniqueWithoutWebsiteInput'];
  PageUpdateWithoutWebsiteDataInput: NexusGenInputs['PageUpdateWithoutWebsiteDataInput'];
  PageUpsertWithWhereUniqueWithoutWebsiteInput: NexusGenInputs['PageUpsertWithWhereUniqueWithoutWebsiteInput'];
  PageWhereInput: NexusGenInputs['PageWhereInput'];
  PageWhereUniqueInput: NexusGenInputs['PageWhereUniqueInput'];
  StringFieldUpdateOperationsInput: NexusGenInputs['StringFieldUpdateOperationsInput'];
  StringFilter: NexusGenInputs['StringFilter'];
  UserUpdateInput: NexusGenInputs['UserUpdateInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
  WebsiteCreateInput: NexusGenInputs['WebsiteCreateInput'];
  WebsiteCreateOneWithoutPagesInput: NexusGenInputs['WebsiteCreateOneWithoutPagesInput'];
  WebsiteCreateWithoutPagesInput: NexusGenInputs['WebsiteCreateWithoutPagesInput'];
  WebsiteCreateWithoutUserInput: NexusGenInputs['WebsiteCreateWithoutUserInput'];
  WebsiteOrderByInput: NexusGenInputs['WebsiteOrderByInput'];
  WebsiteScalarWhereInput: NexusGenInputs['WebsiteScalarWhereInput'];
  WebsiteUpdateInput: NexusGenInputs['WebsiteUpdateInput'];
  WebsiteUpdateManyDataInput: NexusGenInputs['WebsiteUpdateManyDataInput'];
  WebsiteUpdateManyWithWhereNestedInput: NexusGenInputs['WebsiteUpdateManyWithWhereNestedInput'];
  WebsiteUpdateManyWithoutUserInput: NexusGenInputs['WebsiteUpdateManyWithoutUserInput'];
  WebsiteUpdateOneRequiredWithoutPagesInput: NexusGenInputs['WebsiteUpdateOneRequiredWithoutPagesInput'];
  WebsiteUpdateWithWhereUniqueWithoutUserInput: NexusGenInputs['WebsiteUpdateWithWhereUniqueWithoutUserInput'];
  WebsiteUpdateWithoutPagesDataInput: NexusGenInputs['WebsiteUpdateWithoutPagesDataInput'];
  WebsiteUpdateWithoutUserDataInput: NexusGenInputs['WebsiteUpdateWithoutUserDataInput'];
  WebsiteUpsertWithWhereUniqueWithoutUserInput: NexusGenInputs['WebsiteUpsertWithWhereUniqueWithoutUserInput'];
  WebsiteUpsertWithoutPagesInput: NexusGenInputs['WebsiteUpsertWithoutPagesInput'];
  WebsiteWhereInput: NexusGenInputs['WebsiteWhereInput'];
  WebsiteWhereUniqueInput: NexusGenInputs['WebsiteWhereUniqueInput'];
  QueryMode: NexusGenEnums['QueryMode'];
  Role: NexusGenEnums['Role'];
  SortOrder: NexusGenEnums['SortOrder'];
  WebsiteStatus: NexusGenEnums['WebsiteStatus'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  DateTime: NexusGenScalars['DateTime'];
  Json: NexusGenScalars['Json'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createPage: NexusGenRootTypes['Page']; // Page!
    createWebsite: NexusGenRootTypes['Website']; // Website!
    deletePage: NexusGenRootTypes['Page'] | null; // Page
    deleteWebsite: NexusGenRootTypes['Website'] | null; // Website
    updatePage: NexusGenRootTypes['Page'] | null; // Page
    updateUser: NexusGenRootTypes['User'] | null; // User
    updateWebsite: NexusGenRootTypes['Website'] | null; // Website
  }
  Page: { // field return type
    blocks: NexusGenScalars['Json']; // Json!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    path: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    page: NexusGenRootTypes['Page'] | null; // Page
    pages: NexusGenRootTypes['Page'][]; // [Page!]!
    websites: NexusGenRootTypes['Website'][]; // [Website!]!
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string | null; // String
    emailVerified: NexusGenScalars['DateTime'] | null; // DateTime
    id: number; // Int!
    image: string | null; // String
    name: string | null; // String
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    websites: NexusGenRootTypes['Website'][]; // [Website!]!
  }
  Website: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    defaultTheme: string; // String!
    id: number; // Int!
    location: string; // String!
    pages: NexusGenRootTypes['Page'][]; // [Page!]!
    status: NexusGenEnums['WebsiteStatus']; // WebsiteStatus!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createPage: { // args
      data: NexusGenInputs['PageCreateInput']; // PageCreateInput!
    }
    createWebsite: { // args
      data: NexusGenInputs['WebsiteCreateInput']; // WebsiteCreateInput!
    }
    deletePage: { // args
      where: NexusGenInputs['PageWhereUniqueInput']; // PageWhereUniqueInput!
    }
    deleteWebsite: { // args
      where: NexusGenInputs['WebsiteWhereUniqueInput']; // WebsiteWhereUniqueInput!
    }
    updatePage: { // args
      data: NexusGenInputs['PageUpdateInput']; // PageUpdateInput!
      where: NexusGenInputs['PageWhereUniqueInput']; // PageWhereUniqueInput!
    }
    updateUser: { // args
      data: NexusGenInputs['UserUpdateInput']; // UserUpdateInput!
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    updateWebsite: { // args
      data: NexusGenInputs['WebsiteUpdateInput']; // WebsiteUpdateInput!
      where: NexusGenInputs['WebsiteWhereUniqueInput']; // WebsiteWhereUniqueInput!
    }
  }
  Query: {
    page: { // args
      where: NexusGenInputs['PageWhereUniqueInput']; // PageWhereUniqueInput!
    }
    pages: { // args
      after?: NexusGenInputs['PageWhereUniqueInput'] | null; // PageWhereUniqueInput
      before?: NexusGenInputs['PageWhereUniqueInput'] | null; // PageWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
    websites: { // args
      after?: NexusGenInputs['WebsiteWhereUniqueInput'] | null; // WebsiteWhereUniqueInput
      before?: NexusGenInputs['WebsiteWhereUniqueInput'] | null; // WebsiteWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['WebsiteOrderByInput'][] | null; // [WebsiteOrderByInput!]
      where?: NexusGenInputs['WebsiteWhereInput'] | null; // WebsiteWhereInput
    }
  }
  User: {
    websites: { // args
      after?: NexusGenInputs['WebsiteWhereUniqueInput'] | null; // WebsiteWhereUniqueInput
      before?: NexusGenInputs['WebsiteWhereUniqueInput'] | null; // WebsiteWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
  Website: {
    pages: { // args
      after?: NexusGenInputs['PageWhereUniqueInput'] | null; // PageWhereUniqueInput
      before?: NexusGenInputs['PageWhereUniqueInput'] | null; // PageWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Page" | "Query" | "User" | "Website";

export type NexusGenInputNames = "DateTimeFieldUpdateOperationsInput" | "DateTimeFilter" | "EnumRoleFieldUpdateOperationsInput" | "EnumWebsiteStatusFieldUpdateOperationsInput" | "EnumWebsiteStatusFilter" | "IntFilter" | "NestedDateTimeFilter" | "NestedEnumWebsiteStatusFilter" | "NestedIntFilter" | "NestedStringFilter" | "NullableDateTimeFieldUpdateOperationsInput" | "NullableStringFieldUpdateOperationsInput" | "PageCreateInput" | "PageCreateManyWithoutWebsiteInput" | "PageCreateWithoutWebsiteInput" | "PageListRelationFilter" | "PageScalarWhereInput" | "PageUpdateInput" | "PageUpdateManyDataInput" | "PageUpdateManyWithWhereNestedInput" | "PageUpdateManyWithoutWebsiteInput" | "PageUpdateWithWhereUniqueWithoutWebsiteInput" | "PageUpdateWithoutWebsiteDataInput" | "PageUpsertWithWhereUniqueWithoutWebsiteInput" | "PageWhereInput" | "PageWhereUniqueInput" | "StringFieldUpdateOperationsInput" | "StringFilter" | "UserUpdateInput" | "UserWhereUniqueInput" | "WebsiteCreateInput" | "WebsiteCreateOneWithoutPagesInput" | "WebsiteCreateWithoutPagesInput" | "WebsiteCreateWithoutUserInput" | "WebsiteOrderByInput" | "WebsiteScalarWhereInput" | "WebsiteUpdateInput" | "WebsiteUpdateManyDataInput" | "WebsiteUpdateManyWithWhereNestedInput" | "WebsiteUpdateManyWithoutUserInput" | "WebsiteUpdateOneRequiredWithoutPagesInput" | "WebsiteUpdateWithWhereUniqueWithoutUserInput" | "WebsiteUpdateWithoutPagesDataInput" | "WebsiteUpdateWithoutUserDataInput" | "WebsiteUpsertWithWhereUniqueWithoutUserInput" | "WebsiteUpsertWithoutPagesInput" | "WebsiteWhereInput" | "WebsiteWhereUniqueInput";

export type NexusGenEnumNames = "QueryMode" | "Role" | "SortOrder" | "WebsiteStatus";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "Json" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ContextModule.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginSchemaConfig {
  }
}