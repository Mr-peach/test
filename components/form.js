const FormComponent = {
    template: `
        <div class="form-container">
            <form @submit.prevent="handleSubmit" class="user-form">
                <div class="form-group">
                    <label for="name">姓名</label>
                    <input 
                        type="text" 
                        id="name" 
                        v-model="formData.name" 
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="email">邮箱</label>
                    <input 
                        type="email" 
                        id="email" 
                        v-model="formData.email" 
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="phone">电话</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        v-model="formData.phone" 
                        pattern="[0-9]{11}"
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="category">类别</label>
                    <select 
                        id="category" 
                        v-model="formData.category" 
                        required
                    >
                        <option value="">请选择类别</option>
                        <option value="suggestion">建议</option>
                        <option value="feedback">反馈</option>
                        <option value="complaint">投诉</option>
                        <option value="other">其他</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">留言</label>
                    <textarea 
                        id="message" 
                        v-model="formData.message" 
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" class="submit-btn">提交</button>
            </form>
        </div>
    `,
    data() {
        return {
            formData: {
                name: '',
                email: '',
                phone: '',
                category: '',
                message: ''
            }
        }
    },
    methods: {
        handleSubmit() {
            // 发送表单数据到根组件
            this.$root.$emit('form-submitted', this.formData);
            console.log('表单数据：', this.formData);
            alert('表单提交成功！');
            // 重置表单
            this.formData = {
                name: '',
                email: '',
                phone: '',
                category: '',
                message: ''
            };
        }
    }
}