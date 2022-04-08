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

    carregaTabelas(ano, mes, dia)
}

function carregaTabelas(ano, mes, dia){

    var dataFormatada = ano+'-'+mes+'-'+dia
    var dataFormatadaBR = dia+'/'+mes+'/'+ano

    constraints = [ 
        DatasetFactory.createConstraint("ipDataPauta", dataFormatadaBR, dataFormatadaBR, ConstraintType.MUST)
    ];
    let dataset = (DatasetFactory.getDataset("DSFormulariodesolicitacao_pauta_diex", null, constraints, null)).values

    setTimeout(()=>{
        
        $('[name="txt_data"]').text(dataFormatadaBR)
        $('[name="txt_responsavel"]').text(dataset[i].rdDiretoria)

        for(i=0;i<dataset.length;i++){
            wdkAddChild('tbl_controle')
            $('[name="column1_1___'+(i+1)+'"]').text(dataset[i].solicitante)
            $('[name="column2_1___'+(i+1)+'"]').text(dataset[i].ipRamal)
            $('[name="column3_1___'+(i+1)+'"]').text(dataset[i].taAssunto)
        }
    }, 500);
}