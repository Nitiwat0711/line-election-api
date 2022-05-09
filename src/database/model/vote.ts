export namespace VoteModel {
  export type T = {
    id: number;
    nationalId: string;
    candidateId: number;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
  };

  export type returnExportValue = {
    candidateId: number;
    nationalId: string;
  };
}
