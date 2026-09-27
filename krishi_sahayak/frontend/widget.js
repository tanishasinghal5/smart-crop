(function() {
    // Inject styles for the widget
    const style = document.createElement('style');
    style.innerHTML = `
        #krishi-widget-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #16402a;
            color: #d7b46a;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 9999;
            transition: transform 0.2s;
            font-size: 28px;
        }
        #krishi-widget-btn:hover {
            transform: scale(1.1);
        }
        #krishi-widget-frame {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 380px;
            height: 600px;
            max-height: 80vh;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            z-index: 9998;
            overflow: hidden;
            display: none;
            border: 1px solid #e5e7eb;
        }
        @media (max-width: 640px) {
            #krishi-widget-frame {
                width: 100%;
                height: 100%;
                bottom: 0;
                right: 0;
                max-height: 100vh;
                border-radius: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'krishi-widget-frame';
    // Default URL to the frontend we just built
    iframe.src = '/krishi_sahayak/frontend/index.html'; 
    document.body.appendChild(iframe);

    // Create Button
    const btn = document.createElement('div');
    btn.id = 'krishi-widget-btn';
    btn.innerHTML = '🌱'; // We can use emoji or fontawesome if loaded
    document.body.appendChild(btn);

    // Toggle logic
    let isOpen = false;
    btn.addEventListener('click', () => {
        isOpen = !isOpen;
        iframe.style.display = isOpen ? 'block' : 'none';
        btn.innerHTML = isOpen ? '✕' : '🌱';
    });
})();
