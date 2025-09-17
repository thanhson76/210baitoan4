// Tạo hiệu ứng âm thanh
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API không được hỗ trợ trên trình duyệt này');
        }
    }

    // Hiệu ứng âm thanh khi trả lời đúng (pháo hoa)
    playCorrectSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    // Hiệu ứng âm thanh khi trả lời sai
    playWrongSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, this.audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
}

// Tạo hiệu ứng pháo hoa
class FireworksEffect {
    constructor() {
        this.container = null;
        this.initContainer();
    }

    initContainer() {
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.container);
    }

    createFirework(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const mainColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Tạo pháo hoa chính
        const mainParticle = document.createElement('div');
        mainParticle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${mainColor};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: explode 1s ease-out forwards;
        `;

        // Tạo các hạt pháo hoa
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (i / 30) * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const size = 2 + Math.random() * 4;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    animation: particleMove 1s ease-out forwards;
                `;

                const keyframes = `
                    @keyframes particleMove {
                        0% {
                            transform: translate(0, 0) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0);
                            opacity: 0;
                        }
                    }
                `;

                const style = document.createElement('style');
                style.textContent = keyframes;
                document.head.appendChild(style);

                this.container.appendChild(particle);

                // Xóa particle sau animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                    if (style.parentNode) {
                        style.parentNode.removeChild(style);
                    }
                }, 1000);

            }, i * 30);
        }

        const explodeKeyframes = `
            @keyframes explode {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(3); opacity: 0.7; }
                100% { transform: scale(5); opacity: 0; }
            }
        `;

        const explodeStyle = document.createElement('style');
        explodeStyle.textContent = explodeKeyframes;
        document.head.appendChild(explodeStyle);

        this.container.appendChild(mainParticle);

        // Xóa particle chính sau animation
        setTimeout(() => {
            if (mainParticle.parentNode) {
                mainParticle.parentNode.removeChild(mainParticle);
            }
            if (explodeStyle.parentNode) {
                explodeStyle.parentNode.removeChild(explodeStyle);
            }
        }, 1000);
    }

    showFireworks() {
        // Hiển thị nhiều pháo hoa ở các vị trí ngẫu nhiên
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight / 2;
                this.createFirework(x, y);
            }, i * 300);
        }
    }
}

// Khởi tạo hiệu ứng
document.addEventListener('DOMContentLoaded', () => {
    window.soundEffects = new SoundEffects();
    window.fireworksEffect = new FireworksEffect();
});