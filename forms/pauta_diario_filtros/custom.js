$(document).ready(function () {
    init();
    $('[name="column2_1"]').remove()
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
    var filtroDsSolicitacaoDePauta=[]
    

    if (data!='' && data!='\xa0'){
        filtroDsSolicitacaoDePauta.push(DatasetFactory.createConstraint("ipDataPauta", data, data, ConstraintType.MUST))
    }

    if (responsavel!='' && responsavel!='\xa0' && responsavel!='Todos'){
        var resp=''
        if (responsavel=='Diretora e Diretor'){resp='Diretoria'}
        else if (responsavel=='Diretora'){resp='Diretoria Executiva'}
        else if (responsavel=='Diretor'){resp='Diretoria Adjunta'}
        filtroDsSolicitacaoDePauta.push(DatasetFactory.createConstraint("rdDiretoria", resp, resp, ConstraintType.MUST))
    }

    if (solicitante!='' && solicitante!='\xa0'){
        filtroDsSolicitacaoDePauta.push(DatasetFactory.createConstraint("solicitante", solicitante, solicitante, ConstraintType.MUST))
    }

    if (slc_status=='Aguardando Despacho'||slc_status=='Cancelado'){
        filtroDsSolicitacaoDePauta.push(DatasetFactory.createConstraint("ipSituacao", 'Finalizado', 'Finalizado', ConstraintType.MUST_NOT))
    } else if (slc_status=='Finalizado'){
        filtroDsSolicitacaoDePauta.push(DatasetFactory.createConstraint("ipSituacao", 'Finalizado', 'Finalizado', ConstraintType.MUST))
    }

    let dataset = (DatasetFactory.getDataset("DSSolicitacaoDePauta", null, filtroDsSolicitacaoDePauta, null)).values
    if  (dataset.length==0){
        FLUIGC.toast({
            title: '',
            message: 'Nenhum dado encontrado para esses filtros!',
            type: 'danger'
        });
        throw "Modificar filtro"
    }

    // 

    setTimeout(()=>{
        for(i=0;i<dataset.length;i++){
            var constraints=[DatasetFactory.createConstraint("processTaskPK.processInstanceId", dataset[i].ipNumForm, dataset[i].ipNumForm, ConstraintType.MUST)]
            let status = (DatasetFactory.getDataset("processTask", ['status','processTaskPK.colleagueId'], constraints, null)).values

            if(status[status.length-1]['status']==4){
                dataset[i].ipSituacao='Cancelado'
                if (slc_status!='Cancelado'&&slc_status!='Todos'){
                    continue;
                }
            } else {
                if (slc_status=='Cancelado'){
                    continue;
                }
            }

            dtAtual= new Date(new Date().setHours(0,0,0,0));
            dtPauta=(dataset[i].ipDataPauta).split('/')

            if (new Date(dtPauta[2],parseInt(dtPauta[1])-1,dtPauta[0])>dtAtual){
                continue;
            }

            var filtroTable=[]
            var idForm = dataset[i]['metadata#id']
            filtroTable.push(DatasetFactory.createConstraint("tablename", "tb_00_Participantes", "tb_00_Participantes", ConstraintType.MUST))
            filtroTable.push(DatasetFactory.createConstraint("metadata#id", idForm, idForm, ConstraintType.MUST));
            let resultTable = (DatasetFactory.getDataset("DSSolicitacaoDePauta", null, filtroTable, null)).values
            let nome = ''
            for (var x=0;x<resultTable.length;x++){
                nome=nome+resultTable[x].txt_00_nome1+'<br />'
            }

            num=wdkAddChild('tbl_controle')
            $('[name="column1_1___'+num+'"]').html(dataset[i].solicitante+'<br />'+nome+'<br /><b>Ramal: </b>'+dataset[i].ipRamal)
            $('[name="column3_1___'+num+'"]').html((dataset[i].taAssunto).replace(/\n/g, '<br />'))
            $('[name="column5_1___'+num+'"]').text(dataset[i].ipSituacao)
            $('[name="column4_1___'+num+'"]').text(dataset[i].ipDataPauta)

            var resp=''
            if (dataset[i].rdDiretoria=='Diretoria'){resp='Nicole e Vinícius'}
            else if (dataset[i].rdDiretoria=='Diretoria Executiva'){resp='Nicole'}
            else if (dataset[i].rdDiretoria=='Diretoria Adjunta'){resp='Vinícius'}
            
            $('[name="column6_1___'+num+'"]').html(resp+' <br /><br /><b>Prioridade:</b> '+(dataset[i].rdPrioridade).toUpperCase())
            
        }
    }, 500);
}