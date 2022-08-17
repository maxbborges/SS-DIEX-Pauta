$(document).ready(function () {
    init();
});

function init(){
    var data = new Date();
    
	var mes = (data.getMonth()+1);
    if (mes<=9){
        mes = '0'+mes;
    }

    var dia = (data.getDate());
    if (dia<=9){
        dia = '0'+dia
    }

    var hora = (data.getUTCHours()).toString()
    var minuto = (data.getUTCMinutes()).toString()

    var ano = data.getFullYear()
    $('[name="txt_horario"]').text(data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }))
    if (FORM_MODE=='VIEW'){
        carregaTabelas(ano, mes, dia)
    } else {
        $('#tabelaSolicitantes').hide()
        var mySimpleCalendar = FLUIGC.calendar('#txt_data',{
            useCurrent: true,
            language: 'pt-br',
            pickDate: true,
        });
        dataAtual = new Date()
        // mySimpleCalendar.setDate(dataAtual);
    }

    
}

function carregaTabelas(ano, mes, dia){
    var dataFormatada = ano+'-'+mes+'-'+dia
    var dataFormatadaBR = dia+'/'+mes+'/'+ano
    var data = $('[name="txt_data"]').text()
    var responsavel = $('[name="txt_responsavel"]').text()
    var solicitante = $('[name="txt_cargo"]').text()
    var slc_status = $('[name="slc_status"]').text()
    constraints=[]

    if (data!='' && data!='\xa0'){
        constraints.push(DatasetFactory.createConstraint("ipDataPauta", data, data, ConstraintType.MUST))
    }

    if (responsavel!='' && responsavel!='\xa0' && responsavel!='Diretora e Diretor'){
        constraints.push(DatasetFactory.createConstraint("rdDiretoria", responsavel, responsavel, ConstraintType.MUST))
    }

    if (solicitante!='' && solicitante!='\xa0'){
        constraints.push(DatasetFactory.createConstraint("solicitante", solicitante, solicitante, ConstraintType.MUST))
    }

    if (slc_status=='Aguardando Despacho'||slc_status=='Cancelado'){
        constraints.push(DatasetFactory.createConstraint("ipSituacao", 'Finalizado', 'Finalizado', ConstraintType.MUST_NOT))
    } else if (slc_status=='Finalizado'){
        constraints.push(DatasetFactory.createConstraint("ipSituacao", 'Finalizado', 'Finalizado', ConstraintType.MUST))
    }

    let dataset = (DatasetFactory.getDataset("DSSolicitacaoDePauta", null, constraints, null)).values
    if  (dataset.length==0){
        FLUIGC.toast({
            title: '',
            message: 'Nenhum dado encontrado para esses filtros!',
            type: 'danger'
        });
        throw "Modificar filtro"
    }
    setTimeout(()=>{
        for(i=0;i<dataset.length;i++){
            console.log(dataset)
            constraints=[DatasetFactory.createConstraint("processTaskPK.processInstanceId", dataset[i].ipNumForm, dataset[i].ipNumForm, ConstraintType.MUST)]
            let status = (DatasetFactory.getDataset("processTask", ['status','processTaskPK.colleagueId'], constraints, null)).values
            if(status[status.length-1].status==4){
                dataset[i].ipSituacao='Cancelado'
                if (slc_status!='Cancelado'&&slc_status!='Todos'){
                    continue;
                }
            } else {
                if (slc_status=='Cancelado'){
                    continue;
                }
            }
            num=wdkAddChild('tbl_controle')
            $('[name="column1_1___'+num+'"]').text(dataset[i].solicitante)
            $('[name="column2_1___'+num+'"]').text(dataset[i].ipRamal)
            $('[name="column3_1___'+num+'"]').text(dataset[i].taAssunto)
            $('[name="column5_1___'+num+'"]').text(dataset[i].ipSituacao)
            $('[name="column4_1___'+num+'"]').text(dataset[i].ipDataPauta)
            
        }
    }, 500);
}