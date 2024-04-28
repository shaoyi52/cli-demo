<template>
    <div>
      <el-upload
      :action="upload.url"
      :before-upload="handleBeforeUpload"
      :on-success="handUploadSuccess"
      :on-error="handleuploadError"
      class="editor-img-uploader"
      name="file"
      :show-file-list="false"
      :headers="upload.headers"
      ref="uploadRef"
      v-if="type==='url'"
      >
      </el-upload>
      <div class="editor">
        <quill-editor ref="quillEditorRef"
          v-model:content="content"
          contentType='html'
          @textChange="(e:any)=>$emit('update:modelValue',content)"
          :options="options"
          :style="styles"
          />
      </div>
    </div>
</template>
  
<script setup name="Editors" lang='ts'>
  import {QuillEditor,Quill} from '@/vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import {propsTypes} from '@/utils/propTypes';
  import {globalHeaders} from "@/utils/request"
  import { ComponentInternalInstance, getCurrentInstance, toRaw } from 'vue';
import { watch } from 'fs';
  
  const props = defineProps({
    /**编辑器的内容 */
    modelValue:propsTypes.string,
    /**高度 */
    height:propsTypes.number.def(400),
    minHeight:propsTypes.number.def(400),
    readOnly:propsTypes.propTypes.bool.def(false),
    fileSize:propsTypes.number.def(5),
    type:propsTypes.Sting,def('url')
  });

  const {proxy} = getCurrentInstance() as ComponentInternalInstance;

  const upload = reactive<UploadOption>({
    headers:globalHeaders(),
    url:import.meta.env.VITE_APP_BASE_API+'/resource/oss/upload'
  })

  const quillEditorRef = ref()

  const options = ref({
    theme:'snow',
    bounds:document.body,
    debug:'warn',
    modules:{
      // 工具栏配置
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
          ["blockquote", "code-block"],                    // 引用  代码块
          [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
          [{ indent: "-1" }, { indent: "+1" }],            // 缩进
          [{ size: ["small", false, "large", "huge"] }],   // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
          [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
          [{ align: [] }],                                 // 对齐方式
          ["clean"],                                       // 清除文本格式
          ["link", "image", "video"]                       // 链接、图片、视频
        ],
        handlers: {
          image: function (value: any) {
            if (value) {
              // 调用element图片上传
              (document.querySelector(".editor-img-uploader>.el-upload") as HTMLDivElement)?.click();
            } else {
              Quill.format("image", true);
            }
          },
        },
      }
    },
    placeholder:'请输入内容',
    readOnly:props.readOnly
  });

  const content = ref('');
  watch(()=>props.modelValue,(v)=>{
    if(v!==content.value){
      content.value=v===undefined?"<p></p>":v;
    }
  },{immediate:true})
  // 图片上传成功返回图片地址
  const handleUploadSucces = (res:any) =>{
    // 如果上传成功
    if(res.code === 200){
      let quill = toRaw(quillEditorRef.value).getQuill();
      let length = quill.selection.savedRange.index;
      quill.insertEmbed(length,"image",res.data.url);
      quill.setSelection(length+1);
      proxy?.$modal.closeLoading();
    }else{
      proxy?.$modal.loading(res.msg);
      proxy?.$modal.closeLoading();
    }
  }

  // 图片上传胶拦截
  const handleBeforUpload = (file:any)=>{
    const type = ["image/jpeg","image/jpg","image/png","image/svg"]
    const isJPG = type.includes(file.type);
    //检验文件格式
    if(!isJPG){
      proxy?.$modal.msgError('图片格式错误');
      return false;
    }
    //校检文件大小
    if(props.fileSize){
      const isLt=file.size/1024/1024>props.fileSize;
      if(isLt){
        proxy?.$modal.msgError(`上传文件大小不能超过${props.fileSize} MB!`);
        return false;
      }
    }
    proxy?.$modal.loading('正在上传文件，请稍候...')
  }

  const handleUploadError =(err:any)=>{
    console.error(err);
    proxy?.$modal.msgError('上传文件失败');
  }
</script>
  
<style>
  
</style>