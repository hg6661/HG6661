// website/music.js
class BackgroundMusic {
    constructor() {
        this.audio = new Audio('../assets/123.mp3');
        this.audio.volume = 0.3; // 30%音量
        this.audio.loop = true;
        this.isPlaying = false;
        
        // 创建控制按钮
        this.createButton();
        
        // 尝试自动播放（需要用户交互）
        this.setupAutoplay();
    }
    
    createButton() {
        const btn = document.createElement('button');
        btn.className = 'music-btn';
        btn.id = 'musicToggle';
        btn.innerHTML = '🔇';
        
        const container = document.createElement('div');
        container.className = 'music-control';
        container.appendChild(btn);
        document.body.appendChild(container);
        
        // 点击事件
        btn.addEventListener('click', () => this.toggle());
        
        // 监听音乐状态
        this.audio.addEventListener('play', () => {
            btn.innerHTML = '🎵';
            this.isPlaying = true;
        });
        
        this.audio.addEventListener('pause', () => {
            btn.innerHTML = '🔇';
            this.isPlaying = false;
        });
        
        // 错误处理
        this.audio.addEventListener('error', (e) => {
            console.error('音乐加载失败:', e);
            btn.innerHTML = '❌';
            btn.title = '音乐文件加载失败，请检查路径';
        });
    }
    
    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(e => {
                console.log('播放失败:', e);
                alert('点击页面任意位置后，再点击播放按钮');
            });
        }
    }
    
    setupAutoplay() {
        // 用户第一次点击页面时自动播放
        const playOnInteraction = () => {
            if (!this.isPlaying) {
                this.audio.play().catch(e => {
                    console.log('自动播放被阻止，需要用户手动点击');
                });
            }
            document.removeEventListener('click', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.backgroundMusic = new BackgroundMusic();
});
