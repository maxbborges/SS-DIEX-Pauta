function displayFields(form, customHTML) {
	customHTML.append("<script> var ATIVIDADE = "+getValue("WKNumState")+";</script>"); 
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> $('ecm-documentview-toolbar').hide();</script>");
}