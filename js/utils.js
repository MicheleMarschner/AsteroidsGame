class Utils {

    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    } 
    
    static rotate_dx (angle, hypot) {
        return hypot * Math.cos(this.toRadians(angle));
    }

    static rotate_dy (angle, hypot) {
        return hypot * Math.sin(this.toRadians(angle));
    }

    static distBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}
