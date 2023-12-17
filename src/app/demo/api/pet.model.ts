interface InventoryStatus {
    label: string;
    value: string;
}
export interface Pet {
    id?: string;
    key?: string
    code?: string;
    name?: string;
    especie?: string;
    idade?: number;
    data?: Date;
    peso?: number;
    sexo?: InventoryStatus;
}
