/**
 * Game Physics Engine.
 */

class EB_Physics {
    collision(i1, i2) {
        let item_1 = i1.collisionBox;
        let item_2 = i2.collisionBox;
        let collision = {x: false, y: false, xy: false};
        if ((item_1.right >= item_2.left && item_1.left < item_2.left) || (item_1.right <= item_2.right && item_1.left >= item_2.left) || (item_1.right >= item_2.right && item_1.left <= item_2.left) || (item_1.right > item_2.right && item_1.left <= item_2.right)) {
            collision.x = true;
        }
        if ((item_1.bottom >= item_2.top && item_1.top < item_2.top) || (item_1.bottom <= item_2.bottom && item_1.top >= item_2.top) || (item_1.bottom >= item_2.bottom && item_1.top <= item_2.top) || (item_1.bottom > item_2.bottom && item_1.top <= item_2.bottom)) {
            collision.y = true;
        }
        if (collision.x && collision.y) collision.xy = true; 
        return collision.xy;
    }
}