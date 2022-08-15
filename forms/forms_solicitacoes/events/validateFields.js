function validateForm(form) {
    var wkactivity = getValue('WKNumState');

    if (wkactivity==0||wkactivity==4||wkactivity==20){
        if (form.getValue('rdDiretoria') == null || form.getValue('rdDiretoria') == ""){
            exibirMensagem("Necessário selecionar o responsável")
        }

        if (form.getValue('rdPrioridade') == null || form.getValue('rdPrioridade') == ""){
            exibirMensagem("Necessário selecionar a prioridade")
        }

        if (form.getValue('taAssunto') == null || form.getValue('taAssunto') == ""){
            exibirMensagem("Necessário descrever o assunto")
        }

        if (form.getValue('ipRamal') == null || form.getValue('ipRamal') == ""){
            exibirMensagem("Necessário preencher o Ramal")
        }
    }

    if (wkactivity==5){
        if (form.getValue('rd_despachar') == null || form.getValue('rd_despachar') == ""){
            exibirMensagem("Necessário selecionar a decisão!")
        }
        if (form.getValue('rd_despachar') == 'Nao-corrigir' && form.getValue('atxt_motivo')==''){
            exibirMensagem("Necessário descrever o motivo da correção ou remarcação!")
        }

    }

    if (wkactivity==9){
        // if (form.getValue('rdNecessarioDevolutiva') == null || form.getValue('rdNecessarioDevolutiva') == ""){
        //     exibirMensagem("Necessário informar se há necessidade de devolutiva!")
        // }
        if (form.getValue('rdFinalizar') == null && form.getValue('rdFinalizar')==''){
            exibirMensagem("Necessário informar se pode finalizar a solicitação!")
        }
    }

    if (wkactivity==23){
        // if (form.getValue('rd_devolutiva') == null || form.getValue('rd_devolutiva') == ""){
        //     exibirMensagem("Necessário informar se a devolutiva foi criada e se possível, informar o numero da mesma!")
        // }
    }

    if (wkactivity==20){

    }
}

function exibirMensagem(mensagem){
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI.";
}