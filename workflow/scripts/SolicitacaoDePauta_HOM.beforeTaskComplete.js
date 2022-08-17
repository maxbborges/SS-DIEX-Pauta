function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	var activity = getValue("WKNumState")
	if (nextSequenceId==5){
		hAPI.setCardValue("ipSituacao", 'Análise Secretária')
	}
	
	if (nextSequenceId==9){
		hAPI.setCardValue("ipSituacao", 'Aguardando Despacho')
	}

	if (nextSequenceId==23){
		hAPI.setCardValue("ipSituacao", 'Criando Devolutiva')
	}
	
	if (nextSequenceId==17){
		hAPI.setCardValue("ipSituacao", 'Finalizado')
	}
}