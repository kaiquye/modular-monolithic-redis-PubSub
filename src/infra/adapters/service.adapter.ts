export abstract class IService<In, OUt> {
  abstract Execute(input: In): Promise<OUt>;
}
