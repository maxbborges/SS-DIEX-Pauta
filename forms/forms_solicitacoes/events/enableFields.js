function enableFields(form) {
    atividade = getValue("WKNumState")
    if(atividade != 0 && atividade != 4 && atividade != 20) {
        form.setEnabled("rdDiretoria",false);
        form.setEnabled("taAssunto",false);
        form.setEnabled("rdPrioridade",false);
        form.setEnabled("ipRamal",false);
        form.setEnabled("ipDataPauta",false);
    }

    if (atividade!=5){
        form.setEnabled("rd_despachar",false);
        form.setEnabled("atxt_motivo",false);
    }

    if(atividade != 9) {
        form.setEnabled("rdNecessarioDevolutiva",false);
        form.setEnabled("rdFinalizar",false);
        form.setEnabled("taMotivos",false);
    }

    if(atividade != 23) {
        form.setEnabled("rd_devolutiva",false);
        form.setEnabled("atxt_motivo_devolutiva",false);
    }
}