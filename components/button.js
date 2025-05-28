// 定义一个简单的按钮组件
const ButtonComponent = {
    template: `
        <button 
            @click="handleClick" 
            style="padding: 8px 16px; 
                   background-color: #4CAF50; 
                   color: white; 
                   border: none; 
                   border-radius: 4px; 
                   cursor: pointer;"
        >
            点击次数: {{ count }}
        </button>
    `,
    data() {
        return {
            count: 0
        }
    },
    methods: {
        handleClick() {
            this.count++
        }
    }
}