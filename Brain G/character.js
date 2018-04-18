// - character ----------------------------------------------------------------
function Character() {
    this.position = new Point();
    this.size = 0;
}

Character.prototype.init = function (size) {
    this.size = size;
};

//character shot-----------------------------------------------
function CharaShot() {
    this.position = new Point();
    this.size = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.alive = false;
}

CharaShot.prototype.set = function (p, size, speedx, speedy) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speedx = speedx;
    this.speedy = speedy;
    this.alive = true;
};

CharaShot.prototype.move = function () {
    this.position.y -= this.speedy;
    this.position.x -= this.speedx;
    if (this.position.y <= 0)
        this.alive = false;
    else if (screenCanvas.height <= this.position.y)
        this.alive = false
    else if (this.position.x <= 0)
        this.alive = false;
    else if (screenCanvas.width <= this.position.x)
        this.alive = false
};
// - enemy-------------------------------------------------------------
function Enemy() {
    this.position = new Point();
    this.size = 100;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

Enemy.prototype.set = function (p, size, type) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.type = type;
    this.param = 0;
    this.alive = true;
};

Enemy.prototype.move = function () {
    this.param++;
    switch (this.type) {
        case 0:
            this.position.x += 3;
            if (this.position.x > this.size + screenCanvas.width)
                this.alive = false;
            break;
        case 1:
            this.position.x -= 3;
            if (this.position.x < -this.size)
                this.alive = false;
            break;
    }
};
// enemy shot-------------------------
function EnemyShot() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    this.alive = false;
}

EnemyShot.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.vector.x = vector.x;
    this.vector.y = vector.y;
    this.size = size;
    this.speed = speed;
    this.alive = true;
};

EnemyShot.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
//BOSS----------------------------------------------------------------------------------------------------------------------------------------
function Boss() {
    this.position = new Point();
    this.size = 100;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

Boss.prototype.set = function (p, size, type) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.type = type;
    this.param = 0;
    this.alive = true;
};

Boss.prototype.move = function () {
    this.param++;
    if (this.position.y < (screenCanvas.height - this.size) / 2) {
        this.position.y += 1;
    };
}
// boss shot-------------------------
function BossShot() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    //this.alive = false;
}

BossShot.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.vector = vector;
    this.alive = true;
};
BossShot.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
// boss shot2-------------------------
function BossShot2() {
    this.position = new Point();
    this.vector = new Point();
    this.size = 0;
    this.speed = 0;
    //this.alive = false;
}

BossShot2.prototype.set = function (p, vector, size, speed) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.speed = speed;
    this.vector = vector;
    this.alive = true;
};
BossShot2.prototype.move = function () {
    this.position.x += this.vector.x * this.speed;
    this.position.y += this.vector.y * this.speed;
    if (
        this.position.x < -this.size ||
        this.position.y < -this.size ||
        this.position.x > this.size + screenCanvas.width ||
        this.position.y > this.size + screenCanvas.height
    ) {
        this.alive = false;
    }
};
// - BossSAB-------------------------------------------------------------
function BossSAB() {
    this.position = new Point();
    this.size = 100;
    this.type = 0;
    this.param = 0;
    this.alive = false;
}

BossSAB.prototype.set = function (p, size, type) {
    this.position.x = p.x;
    this.position.y = p.y;
    this.size = size;
    this.type = type;
    this.param = 0;
    this.alive = true;
};

BossSAB.prototype.move = function () {
    this.param++;
    switch (this.type) {
        case 0:
            if (this.position.x >= screenCanvas.width / 6)
                this.position.x -= 1;
            break;
        case 1:
            if (this.position.x <= screenCanvas.width / 6 * 5)
                this.position.x += 1;
            break;
    }
};