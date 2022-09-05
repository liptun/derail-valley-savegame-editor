export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface Turntable {
    rot: number;
}

export enum Item {
    Map = "Map",
    MapSchematic = "MapSchematic",
    DVGuide = "DVGuide",
    Wallet = "wallet",
    CommsRadio = "CommsRadio",
}

export interface Savegame {
    Version?: number;
    License_TrainDriver?: boolean;
    License_DE2?: boolean;
    License_DE6?: boolean;
    License_ConcurrentJobs1?: boolean,
    License_ConcurrentJobs2?:boolean,
    License_SH282?:boolean,
    License_MultipleUnit?:boolean,
    License_ManualService?:boolean,
    Job_Licenses?: number;
    Player_money?: number;
    Player_position?: Position;
    Player_rotation?: Position;
    Player_car_guid?: string;
    Player_inventory_items?: Item[];
    Carboose_In_Range?: boolean;
    Last_Tracks_Hash?: string;
    Storage_Belt?: Item[];
    Strorage_LostAndFound?: string;
    Storage_Inventory?: string;
    Storage_World?: string;
    Turntables?: {
        T_OWC_1: Turntable;
        T_FRS_1: Turntable;
        T_MB_1: Turntable;
        T_SW_1: Turntable;
        T_CSW_1: Turntable;
        T_FF_1: Turntable;
        T_SM_1: Turntable;
        T_IMW_1: Turntable;
        T_HB_1: Turntable;
        T_MF_1: Turntable;
    };
    Tutorial_01_completed?: boolean;
    Tutorial_02_completed?: boolean;
    Tutorial_state?: number;
    Tutorial_backtrack_state?: number;
    Tutorial_loco_id?: string;
    Tutorial_cargo_car_id?: string;
    Tutorial_service_loco_id?: string;
    Tutorial_turntable_loco_ids?: string;
    Junctions?: string;
    Cars?: string;
    Jobs?: string;
    Debt_deleted_locos?: {
        destroyedLocosDebts: any[];
    };
    Debt_staged_jobs?: {
        stagedJobsDebts: any[];
    };
    Debt_jobless_cars?: {
        joblessCarDebts: any[];
    };
    Debt_insurance?: {
        paid: number;
    };
}
