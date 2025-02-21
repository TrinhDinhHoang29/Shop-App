
tinymce.init({
    selector: 'textarea',
    plugins:"image code",
    image_title:true,
    image_upload_url:'', //Đường dẫn API cần upload , API phải up lên bằng pthuoc post API phải trả về { location:Đường link ảnh}
    automatic_uploads:true,
    file_picker_types:"image"
});