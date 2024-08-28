// Settings for particles
var settings = {
    particles: {
        length:   500, // maximum amount of particles
        duration: 2,   // particle duration in sec
        velocity: 100, // particle velocity in pixels/sec
        effect: -0.75, // play with this for a nice effect
        size: 30,     // particle size in pixels
    },
};

// Point class
var Point = (function() {
    function Point(x, y) {
        this.x = (typeof x !== 'undefined') ? x : 0;
        this.y = (typeof y !== 'undefined') ? y : 0;
    }
    Point.prototype.clone = function() {
        return new Point(this.x, this.y);
    };
    Point.prototype.length = function(length) {
        if (typeof length == 'undefined')
            return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
    };
    Point.prototype.normalize = function() {
        var length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    };
    return Point;
})();

// Particle class
var Particle = (function() {
    function Particle() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
    }
    Particle.prototype.initialize = function(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
    };
    Particle.prototype.update = function(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
    };
    Particle.prototype.draw = function(context, image) {
        function ease(t) {
            return (--t) * t * t + 1;
        }
        var size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
    };
    return Particle;
})();

// ParticlePool class
var ParticlePool = (function() {
    var particles,
        firstActive = 0,
        firstFree   = 0,
        duration    = settings.particles.duration;

    function ParticlePool(length) {
        particles = new Array(length);
        for (var i = 0; i < particles.length; i++)
            particles[i] = new Particle();
    }
    ParticlePool.prototype.add = function(x, y, dx, dy) {
        particles[firstFree].initialize(x, y, dx, dy);
        firstFree++;
        if (firstFree == particles.length) firstFree = 0;
        if (firstActive == firstFree) firstActive++;
        if (firstActive == particles.length) firstActive = 0;
    };
    ParticlePool.prototype.update = function(deltaTime) {
        var i;
        if (firstActive < firstFree) {
            for (i = firstActive; i < firstFree; i++)
                particles[i].update(deltaTime);
        }
        if (firstFree < firstActive) {
            for (i = firstActive; i < particles.length; i++)
                particles[i].update(deltaTime);
            for (i = 0; i < firstFree; i++)
                particles[i].update(deltaTime);
        }
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
            firstActive++;
            if (firstActive == particles.length) firstActive = 0;
        }
    };
    ParticlePool.prototype.draw = function(context, image) {
        if (firstActive < firstFree) {
            for (i = firstActive; i < firstFree; i++)
                particles[i].draw(context, image);
        }
        if (firstFree < firstActive) {
            for (i = firstActive; i < particles.length; i++)
                particles[i].draw(context, image);
            for (i = 0; i < firstFree; i++)
                particles[i].draw(context, image);
        }
    };
    return ParticlePool;
})();

// Main script
(function () {
    function playMusic() {
        var myAudio = document.getElementById('playAudio');
        if (myAudio.duration > 0 && !myAudio.paused) {
            // It's playing...do your job
        } else {
            myAudio.play();
            // Not playing...maybe paused, stopped, or never played.
        }
    }

    var canvas = document.getElementById("canvas");
    var body = document.getElementsByTagName("body")[0];
    var ctx = canvas.getContext("2d");

    var particles = new ParticlePool(settings.particles.length);
    var particleRate = settings.particles.length / settings.particles.duration; // particles/sec
    var time;

    // get point on heart with -PI <= t <= PI
    function pointOnHeart(t) {
        return new Point(
            160 * Math.pow(Math.sin(t), 3),
            130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
        );
    }

    // creating the particle image using a dummy canvas
    var image = (function() {
        var canvas  = document.createElement('canvas'),
            context = canvas.getContext('2d');
        canvas.width  = settings.particles.size;
        canvas.height = settings.particles.size;
        function to(t) {
            var point = pointOnHeart(t);
            point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
            point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
            return point;
        }
        context.beginPath();
        var t = -Math.PI;
        var point = to(t);
        context.moveTo(point.x, point.y);
        while (t < Math.PI) {
            t += 0.01;
            point = to(t);
            context.lineTo(point.x, point.y);
        }
        context.closePath();
        context.fillStyle = '#ea80b0';
        context.fill();
        var image = new Image();
        image.src = canvas.toDataURL();
        return image;
    })();

    function render() {
        requestAnimationFrame(render);
        var newTime   = new Date().getTime() / 1000,
            deltaTime = newTime - (time || newTime);
        time = newTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var amount = particleRate * deltaTime;
        for (var i = 0; i < amount; i++) {
            var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
            var dir = pos.clone().length(settings.particles.velocity);
            particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        particles.update(deltaTime);
        particles.draw(ctx, image);
    }

    function setBackgroundColor() {
        scaleCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "hsl(0, 0%, 0%)"; // Black color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function scaleCanvas() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight);
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        var scale = 1;

        canvas.width = Math.floor(w * scale);
        canvas.height = Math.floor(h * scale);
        ctx.scale(scale, scale);
    }

    body.addEventListener("click", function(ev) {
        setBackgroundColor();
        playMusic();
    });

    window.onload = function() {
        setBackgroundColor();
        render();
    };
    window.onresize = setBackgroundColor;
    function onResize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.onresize = onResize;
})();
