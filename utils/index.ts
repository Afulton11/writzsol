export class PrismaUtils {
  public static removeNonExistentValues<T extends Object>(data: T): T {
    // https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/null-and-undefined
    for (let key in data) {
      if (!data[key]) data[key] = undefined;
    }

    return data;
  }
}
