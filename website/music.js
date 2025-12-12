// website/music.js - 优化版本
document.addEventListener('DOMContentLoaded', function() {
    // 延迟加载音乐
    setTimeout(() => {
        initMusicPlayer();
    }, 1000); // 页面加载1秒后再初始化音乐
        
    function initMusicPlayer() {
        const audio = new Audio('../assets/123.mp3');
        audio.preload = 'none'; // 不预加载
        audio.volume = 0.2; // 更低的音量
        audio.loop = true;
        
        // 创建控制按钮
        const musicBtn = document.createElement('button');
        musicBtn.className = 'music-btn';
        musicBtn.id = 'musicToggle';
        musicBtn.innerHTML = '🎵';
        musicBtn.title = '点击播放/暂停背景音乐';
        
        const musicControl = document.createElement('div');
        musicControl.className = 'music-control';
        musicControl.appendChild(musicBtn);
        document.body.appendChild(musicControl);
        
        // 播放状态
        let isPlaying = false;
        
        // 点击控制
        musicBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicBtn.innerHTML = '🔇';
            } else {
                audio.play().then(() => {
                    musicBtn.innerHTML = '🎵';
                    isPlaying = true;
                }).catch(error => {
                    console.log('播放失败，需要用户交互');
                    musicBtn.innerHTML = '⏯️';
                    musicBtn.title = '点击页面任意位置后，再点击这里播放';
                });
            }
        });
        
        // 用户与页面交互后尝试自动播放
        let userInteracted = false;
        
        const tryAutoplay = () => {
            if (!userInteracted && !isPlaying) {
                audio.play().then(() => {
                    musicBtn.innerHTML = '🎵';
                    isPlaying = true;
                }).catch(() => {
                    // 自动播放被阻止，等待用户手动点击
                });
            }
        };
        
        // 用户点击页面后尝试播放
        document.addEventListener('click', function() {
            if (!userInteracted) {
                userInteracted = true;
                tryAutoplay();
            }
        });
        
        // 监听音频事件
        audio.addEventListener('play', () => {
            musicBtn.innerHTML = '🎵';
            isPlaying = true;
        });
        
        audio.addEventListener('pause', () => {
            musicBtn.innerHTML = '🔇';
            isPlaying = false;
        });
    }
});
