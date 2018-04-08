export class Table{
    type: string;
    subtype: string;
    class: string;
    label: string;
    width: number;
    height: number;
    rows: Row[];
    constructor(){
        this.type = 'table';
        this.subtype = '';
        this.class = '';
        this.label = '';
        this.width = 100;
        this.height = 100;
        this.rows = [];
    }
}

export class Row{
    height: 100;
    cols: Column[];
    constructor(){
        this.height = 100;
        this.cols = [];
    }
}
export class Column{
    height: number;
    width: number;
    value: any[];
    editable: boolean;
    constructor(){
        this.height = 100;
        this.width = 100;
        this.value = [];
        this.editable = false;
    }
}
