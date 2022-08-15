function displayFields(form, customHTML) {
	customHTML.append("<script> var ATIVIDADE = "+getValue("WKNumState")+";</script>"); 
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	var activity = getValue('WKNumState');
	var usuario = fluigAPI.getUserService().getCurrent();
	var data = new Date();
	var mes = (data.getMonth()+1);
    if (mes<=9){
        mes = '0'+mes;
    }

	if(activity==0||activity==4){
		form.setValue('solicitante',usuario.getFullName());
    	// form.setValue('ipCadastro',data.getDate()+'/'+mes+'/'+data.getFullYear());
    	form.setValue('ipSituacao',"Novo");
	} 

}