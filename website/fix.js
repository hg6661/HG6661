// website/fix.js - 修复所有页面的通用问题

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 修复所有返回按钮的链接
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        // 确保有href属性且指向首页
        if (!btn.getAttribute('href') || !btn.getAttribute('href').includes('index')) {
            btn.setAttribute('href', 'index.html');
        }
        
        // 添加点击效果
        btn.addEventListener('click', function(e) {
            console.log('返回首页点击，目标:', this.href);
            
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // 确保跳转（防止事件被阻止）
            setTimeout(() => {
                window.location.href = this.getAttribute('href');
            }, 50);
        });
    });
    
    // 2. 修复所有内部链接
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html')) {
            // 确保相对路径正确
            if (!href.startsWith('http') && !href.startsWith('/')) {
                // 已经是相对路径，确保能工作
                link.addEventListener('click', function(e) {
                    console.log('导航到:', this.getAttribute('href'));
                });
            }
        }
    });
    
    // 3. 添加页面加载完成的提示
    console.log('页面加载完成，当前路径:', window.location.pathname);
    
    // 4. 检查模糊问题并修复
    const checkAndFixBlur = () => {
        const titles = document.querySelectorAll('h1, h2, h3');
        titles.forEach(title => {
            // 移除可能造成模糊的样式
            title.style.filter = 'none';
            title.style.backdropFilter = 'none';
            title.style.webkitBackdropFilter = 'none';
            title.style.opacity = '1';
        });
    };
    
    // 延迟检查，确保样式已加载
    setTimeout(checkAndFixBlur, 100);
    
    // 5. 修复卡片内容的清晰度
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.backdropFilter = 'blur(8px)';
            card.style.webkitBackdropFilter = 'blur(8px)';
        });
    }, 200);
});
