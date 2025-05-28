const customSelect = document.getElementById('customSelect');
const dropdownOptions = document.getElementById('dropdownOptions');
const selectAll = document.getElementById('selectAll');
const options = document.querySelectorAll('.option-item');

customSelect.addEventListener('click', function() {
    dropdownOptions.classList.toggle('show');
});

// 全选/取消全选逻辑
selectAll.addEventListener('click', function() {
    const allSelected = [...options].every(opt => opt.classList.contains('selected'));
    options.forEach(option => {
        if(allSelected) {
            option.classList.remove('selected');
        } else {
            option.classList.add('selected');
        }
    });
    updateSelectedText();
});

// 选项点击事件
options.forEach(option => {
    option.addEventListener('click', function() {
        this.classList.toggle('selected');
        updateSelectedText();
    });
});

// 更新显示文本的函数
function updateSelectedText() {
    const selectedOptions = Array.from(document.querySelectorAll('.option-item.selected'))
        .map(el => el.textContent);

    customSelect.textContent = selectedOptions.length > 0
        ? selectedOptions.join(', ')
        : '请选择';
}

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendRequest');
    const responseDisplay = document.getElementById('responseData');

    sendButton.addEventListener('click', async () => {
        // 收集表单数据
        const sourceProjectCode = document.getElementById('source_project_code').value;

        // const targetProjectSelect = document.getElementById('target_project_codes');
        // const selectedTargetProjects = Array.from(targetProjectSelect.selectedOptions).map(option => option.value);

        const selectedTargetProjects = Array.from(document.querySelectorAll('.option-item.selected'))
            .map(el => el.dataset.value)

        const fdCodesStr = document.getElementById('fd_codes').value;
        const fdCodes = fdCodesStr.split(',').map(code => code.trim());

        const fd_target_database = document.getElementById('fd_target_database').value;

        // 构造请求体数据
        const requestData = {
            source_project_code: sourceProjectCode,
            target_project_codes: selectedTargetProjects,
            fd_codes:fdCodes,
            fd_target_database:fd_target_database
        };

        console.log('Request Data:', requestData);

        try {
            // 显示加载状态
            responseDisplay.textContent = '加载中...';
            sendButton.disabled = true;
            // 发送POST请求
            const response = await fetch('http://localhost:9527/api/handleFD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            // 首先检查响应状态
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 获取响应文本而不是JSON
            const responseText = await response.text();
            // 尝试解析为JSON，如果失败则直接使用文本
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.log("解析失败")
                data = responseText;
            }
            // 显示响应数据
            responseDisplay.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            // 显示错误信息
            responseDisplay.textContent = `请求失败: ${error.message}`;
        } finally {
            // 恢复按钮状态
            sendButton.disabled = false;
        }
    });
});