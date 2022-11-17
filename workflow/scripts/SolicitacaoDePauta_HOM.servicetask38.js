function servicetask38(attempt, message) {
	log.info("EnviarEmailPauta>>")
	try{
		var indexes = hAPI.getChildrenIndexes("tb_00_Participantes");
		var destinatarios = new java.util.ArrayList();
		var parametros = new java.util.HashMap();
		
		for(var i=0;i<indexes.length;i++){
			log.info(indexes[i])
			destinatarios.add(hAPI.getCardValue('txt_00_email1___'+indexes[i]))
		}
		log.dir(destinatarios)
		
		parametros.put("NOME_USUARIO", "JOAO123");
		parametros.put("CODIGO_USUARIO", "01");
		parametros.put("subject", "Processo ATO 65-35 número: "+getValue("WKNumProces")+" iniciado!");
		parametros.put("Nprocesso", getValue("WKNumProces"));
		
		log.info(parametros)
		log.info(destinatarios)
//		notifier.notify("fluigadmin", "template_gecont", parametros, destinatarios, "text/html");
		
	} catch (e){
		log.info("FLUXOCNPJ>>catch")
		throw e
	}
//	throw "erro"
	return true
}