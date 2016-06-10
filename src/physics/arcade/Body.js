import {
    MAX_BODIES
} from 'physics/arcade/Constants.js'

export let BodyCount = 0;

// Helping data locality by splitting members
// into big arrays.
export let BodyDataPositionX = new Float32Array(MAX_BODIES);
export let BodyDataPositionY = new Float32Array(MAX_BODIES);
export let BodyDataVelocityX = new Float32Array(MAX_BODIES);
export let BodyDataVelocityY = new Float32Array(MAX_BODIES);
export let BodyDataAccelerationX = new Float32Array(MAX_BODIES);
export let BodyDataAccelerationY = new Float32Array(MAX_BODIES);
export let BodyDataGravityX = new Float32Array(MAX_BODIES);
export let BodyDataGravityY = new Float32Array(MAX_BODIES);
export let BodyDataBounceX = new Float32Array(MAX_BODIES);
export let BodyDataBounceY = new Float32Array(MAX_BODIES);
export let BodyDataMaxVelocityX = new Float32Array(MAX_BODIES);
export let BodyDataMaxVelocityY = new Float32Array(MAX_BODIES);
export let BodyDataFrictionX = new Float32Array(MAX_BODIES);
export let BodyDataFrictionY = new Float32Array(MAX_BODIES);
export let BodyDataDragX = new Float32Array(MAX_BODIES);
export let BodyDataDragY = new Float32Array(MAX_BODIES);
export let BodyDataMass = new Float32Array(MAX_BODIES);

function MapVec2(px, py, vx, vy) {
    px[0] = vx;
    py[0] = vy;
    return {
        get x() {
            return px[0];
        },
        get y() {
            return py[0];
        },
        set x(v) {
            px[0] = v;
        },
        set y(v) {
            py[0] = v;
        }
    };
}

function RegisterBody(
    body,
    positionX = 0,
    positionY = 0,
    velocityX = 0,
    velocityY = 0,
    accelerationX = 0,
    accelerationY = 0,
    gravityX = 0,
    gravityY = 0,
    bounceX = 0,
    bounceY = 0,
    maxVelocityX = 10000,
    maxVelocityY = 10000,
    frictionX = 0,
    frictionY = 0,
    dragX = 0,
    dragY = 0,
    mass = 1
) {
    let OldBodyCount = BodyCount++;
    if (OldBodyCount >= MAX_BODIES) {
        return null;
    }
    body.position = MapVec2(
        BodyDataPositionX.subarray(OldBodyCount, BodyCount),
        BodyDataPositionY.subarray(OldBodyCount, BodyCount),
        positionX, positionY
    );
    body.velocity = MapVec2(
        BodyDataVelocityX.subarray(OldBodyCount, BodyCount),
        BodyDataVelocityY.subarray(OldBodyCount, BodyCount),
        velocityX, velocityY
    );
    body.acceleration = MapVec2(
        BodyDataAccelerationX.subarray(OldBodyCount, BodyCount),
        BodyDataAccelerationY.subarray(OldBodyCount, BodyCount),
        accelerationX, accelerationY
    );
    body.gravity = MapVec2(
        BodyDataGravityX.subarray(OldBodyCount, BodyCount),
        BodyDataGravityY.subarray(OldBodyCount, BodyCount),
        gravityX, gravityY
    );
    body.bounce = MapVec2(
        BodyDataBounceX.subarray(OldBodyCount, BodyCount),
        BodyDataBounceY.subarray(OldBodyCount, BodyCount),
        bounceX, bounceY
    );
    body.maxVelocity = MapVec2(
        BodyDataMaxVelocityX.subarray(OldBodyCount, BodyCount),
        BodyDataMaxVelocityY.subarray(OldBodyCount, BodyCount),
        maxVelocityX, maxVelocityY
    );
    body.friction = MapVec2(
        BodyDataFrictionX.subarray(OldBodyCount, BodyCount),
        BodyDataFrictionY.subarray(OldBodyCount, BodyCount),
        frictionX, frictionY
    );
    body.drag = MapVec2(
        BodyDataDragX.subarray(OldBodyCount, BodyCount),
        BodyDataDragY.subarray(OldBodyCount, BodyCount),
        dragX, dragY
    );
    body.ptrMass = BodyDataMass.subarray(OldBodyCount, BodyCount);
    body.ptrMass[0] = mass;
    body.ID = OldBodyCount;
    return body;
}

export default class Body {
    constructor(x, y, collider) {
        if (collider === null || typeof collider === 'undefined') {
            throw 'Body must include collider.';
        }
        this.position = null;
        this.velocity = null;
        this.acceleration = null;
        this.gravity = null;
        this.bounce = null;
        this.maxVelocity = null;
        this.friction = null;
        this.drag = null;
        this.ID = -1;
        this.ptrMass = null;
        this.collider = collider;
        this.immovable = false;
        RegisterBody(
            this,
            x, y,
            0, 0,
            0, 0,
            0, 0,
            0, 0,
            10000, 10000,
            1, 0,
            0, 0
        );
    }
    get mass() {
        return this.ptrMass[0];
    }
    set mass(value) {
        this.ptrMass[0] = value;
    }
}