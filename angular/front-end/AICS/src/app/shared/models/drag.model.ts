export class DragEventConfig {

    public bounds: HTMLElement;
    public handle: HTMLElement;
    public inBounds: boolean;
    public draggable: boolean;
    public position: { x: number, y: number };
    public preventDefaultEvent: boolean;
    public scale: number;
    public trackPosition: boolean;
    public zIndex: string;
    public zIndexMoving: string;

    constructor(
        {
            bounds,
            handle,
            inBounds = false,
            draggable = true,
            position = new XY().json,
            preventDefaultEvent = false,
            scale = 1,
            trackPosition = true,
            zIndex,
            zIndexMoving
        }: {
                bounds?: HTMLElement,
                handle?: HTMLElement,
                inBounds?: boolean,
                draggable?: any,
                position?: XY,
                preventDefaultEvent?: boolean,
                scale?: number,
                trackPosition?: boolean,
                zIndex?: string,
                zIndexMoving?: string
            } = {}
    ) {
        this.bounds = bounds;
        this.handle = handle;
        this.inBounds = inBounds;
        this.draggable = draggable;
        this.position = position;
        this.preventDefaultEvent = preventDefaultEvent;
        this.scale = scale;
        this.trackPosition = trackPosition;
        this.zIndex = zIndex;
        this.zIndexMoving = zIndexMoving;
    }
}


export class XY {
    public x: number;
    public y: number;

    constructor({ x = 0, y = 0 }: { x?: number, y?: number } = {}) {
        this.x = x;
        this.y = y;
    }

    diff(other: XY) {
        return new XY({
            x: this.x - other.x,
            y: this.y - other.y
        });
    }

    get json() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

export class DragEventParticipant {
    public el: HTMLElement;
    public parentDropZone: HTMLElement;
    public type: string;
    public toAdd: string;

    constructor({ el = null, parentDropZone = null, type = 'element', toAdd = null }:
        { el?: HTMLElement, parentDropZone?: HTMLElement, type?: string, toAdd?: string } = {}) {
        this.el = el;
        this.parentDropZone = parentDropZone;
        this.type = type;
        this.toAdd = toAdd;
    }
}
