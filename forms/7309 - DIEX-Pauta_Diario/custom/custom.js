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

    var ano = data.getFullYear()

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
    constraints=[]

    if (data!='' && data!='\xa0'){
        constraints.push(DatasetFactory.createConstraint("ipDataPauta", data, data, ConstraintType.MUST))
    }

    if (responsavel!='' && responsavel!='\xa0' && responsavel!='Todos'){
        constraints.push(DatasetFactory.createConstraint("rdDiretoria", responsavel, responsavel, ConstraintType.MUST))
    }

    if (solicitante!='' && solicitante!='\xa0'){
        constraints.push(DatasetFactory.createConstraint("solicitante", solicitante, solicitante, ConstraintType.MUST))
    }


    console.log(constraints)
    let dataset = (DatasetFactory.getDataset("DSFormulariodesolicitacao_pauta_diex", null, constraints, null)).values
    console.log(dataset)
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
            console.log(dataset[i])
            wdkAddChild('tbl_controle')
            $('[name="column1_1___'+(i+1)+'"]').text(dataset[i].solicitante)
            $('[name="column2_1___'+(i+1)+'"]').text(dataset[i].ipRamal)
            $('[name="column3_1___'+(i+1)+'"]').text(dataset[i].taAssunto)
        }
    }, 500);
}