let selectedTable1,selectedTable2;
let availableColumns1 =[],availableColumns2=[];
let availableFeilds =[];

$('#table1').on('change',function(){
    availableColumns1=[]
    selectedTable1 =  $(this).children("option:selected").text();
    selectedTable1 = selectedTable1.trim();
    let xtm=[];
    xtm[0]=selectedTable1;
    $('#aval-column1').html("");
    fetch('/LabProject/api/get_feilds.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(xtm),
    })
    .then((response) => response.json())
    .then((data) => {
        let arr = [];
        console.log(data)
        for(let i=0;i<data.length;++i){
            arr[i] = data[i].COLUMN_NAME;
            availableColumns1.push(arr[i]);
            $('#aval-column1').append('<option value="'+i+'"> '+ arr[i] +' </option>');
        }
    })
    .catch((error) => {
    console.log(error);
    });


});
$('#table2').on('change',function(){
    availableColumns2=[]
    selectedTable2 =  $(this).children("option:selected").text();
    selectedTable2 = selectedTable2.trim();
    let xtm=[];
    xtm[0]=selectedTable2;
    $('#aval-column2').html("");
    fetch('/LabProject/api/get_feilds.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(xtm),
    })
    .then((response) => response.json())
    .then((data) => {
        let arr = [];
        console.log(data)
        for(let i=0;i<data.length;++i){
            arr[i] = data[i].COLUMN_NAME;
            availableColumns2.push(arr[i]);
            $('#aval-column2').append('<option value="'+i+'"> '+ arr[i] +' </option>');
        }
    })
    .catch((error) => {
    console.log(error);
    });


});

let updateCoulmnPicker = function(){
    $('#column-picker').html('');
    for(let i=0;i<availableFeilds.length;++i){
        let val = availableFeilds[i];
        let html = '<div class="form-check"><input class="form-check-input" type="checkbox" value="'+ i +'" id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault">'+val+'</label></div>  '
        $('#column-picker').append(html);
        
    }
}
let updateColumnDropdown = function(){
    $('.column-dropdown').each(function(){
        $(this).html('');
        let tmp = '<option value="0">' + 'constant' +'</option>'
        $(this).append(tmp);
        for(let i=0;i<availableFeilds.length;++i){
            let val = availableFeilds[i];
            let html = '<option value="'+ (i+1) +'">' + val +'</option>'
            $(this).append(html);
        }
    });
    $('.arithmetic-condition').each(function(){
        let par = $(this);
        let tmp =$(this).children();
        tmp.eq(0).on('change',function(){
            if(this.value != 0){
                tmp.eq(1).val(availableFeilds[this.value-1]);
                tmp.eq(1).prop('readonly',true);
            }
            else{
                tmp.eq(1).prop('readonly',false);

            }
        });
        tmp.eq(4).on('change',function(){
            if(this.value != 0){
                tmp.eq(3).val(availableFeilds[this.value-1]);
                tmp.eq(3).prop('readonly',true);
            }
            else{
                tmp.eq(3).prop('readonly',false);

            }
        });
    });
}

let updateOrderDropdown = function(){
    $('#order-column-list').html("");
    $('#order-column-list').append('<option value="0"> None </option>');
    $('#order-column-list').on('change',function(){
        if(this.value == 0){
            $('#order-value').css('display','none');
        }
        else{
            $('#order-value').css('display','inline-block');
        }
    });
    for(let i=0;i<availableFeilds.length;++i){
        let val = availableFeilds[i];
        let html = '<option value="'+ (i+1) +'">' + val +'</option>'
        $('#order-column-list').append(html);
    }
}

document.querySelector('#select-table-div .get-feild').addEventListener('click',function(){
    availableFeilds=[];
    for(let i=0;i<availableColumns1.length;++i){
        availableFeilds.push(selectedTable1+'.'+availableColumns1[i]);
    }
    for(let i=0;i<availableColumns2.length;++i){
        availableFeilds.push(selectedTable2+'.'+availableColumns2[i]);
    }
    updateCoulmnPicker();
    updateColumnDropdown();
    updateOrderDropdown();
    $('.collapse1').collapse('show');
    

});

document.querySelector('#submit-div button').addEventListener('click',function(){
    let query = "SELECT ";
    let selectedColumns = [];
    $('#column-picker .form-check-input').each(function(){
        if($(this).is(":checked")){
            let ix = $(this).val();
            selectedColumns.push(availableFeilds[ix]);
        }
    });
    for(let i=0;i<selectedColumns.length;++i){
        query+= selectedColumns[i]+' AS '+'"'+selectedColumns[i]+'"';
        if(i!=(selectedColumns.length-1))query+=",";
    }

    query+="FROM ";
    query+=selectedTable1+' ';
    query+=$('#join-type').children("option:selected").text().trim();
    query+=' ';
    query+=selectedTable2+' ON ';
    query+=selectedTable1+'.'+$('#aval-column1').children("option:selected").text().trim();
    query+=' = ';
    query+=selectedTable2+'.'+$('#aval-column2').children("option:selected").text().trim();
    query+=' ';
    
    if($('#condition-type').find(":selected").val() == 0){

    }
    else if($('#condition-type').find(":selected").val() == 1){
        query+="WHERE ";
        let cnt=0;
        $('.arithmetic-condition').each(function(){  
            if(cnt>0)return;
            cnt++;  
            let operator = ["=","<>",">",">=","<","<="];
            let qry="";
            let tmp =$(this).children();
            if(tmp.eq(0).find(":selected").val() == 0){
                let x = tmp.eq(1).val();
                if(typeof(x)=='number')qry+=x;
                else qry += '"'+x+'"';
            }
            else{
                let x = tmp.eq(1).val();
                qry+=x;
            }
            qry+=" ";
            qry += operator[ tmp.eq(2).find(":selected").val()];
            qry+=" ";
            if(tmp.eq(4).find(":selected").val() == 0){
                let x = tmp.eq(3).val();
                if(typeof(x)=='number')qry+=x;
                else qry += '"'+x+'"';
            }
            else{
                let x = tmp.eq(3).val();
                qry+=x;
            }
            query+=qry;
        });
    }
    else if($('#condition-type').find(":selected").val() == 2){
        query+="WHERE NOT ";
        let cnt=0;
        $('.arithmetic-condition').each(function(){
            if(cnt>0)return;
            cnt++;
            let operator = ["=","<>",">",">=","<","<="];
            let qry="";
            let tmp =$(this).children();
            if(tmp.eq(0).find(":selected").val() == 0){
                let x = tmp.eq(1).val();
                if(typeof(x)=='number')qry+=x;
                else qry += '"'+x+'"';
            }
            else{
                let x = tmp.eq(1).val();
                qry+=x;
            }
            qry+=" ";
            qry += operator[ tmp.eq(2).find(":selected").val()];
            qry+=" ";
            if(tmp.eq(4).find(":selected").val() == 0){
                let x = tmp.eq(3).val();
                if(typeof(x)=='number')qry+=x;
                else qry += '"'+x+'"';
            }
            else{
                let x = tmp.eq(3).val();
                qry+=x;
            }
            query+=qry;
        });
    }
    else{
        query+="WHERE ";
        let cnt=0;
        $('.arithmetic-condition').each(function(){
            if(cnt>0){
                let cnd = $('#condition-name-div b').text();
                query+=" "+cnd+" ";
            }
            cnt++;
    
            let operator = ["=","<>",">",">=","<","<="];
            let qry="";
            let tmp =$(this).children();
            if(tmp.eq(0).find(":selected").val() == 0){
                let x = tmp.eq(1).val();
                if(typeof(x)=='number')qry+=x;
                else qry += '"'+x+'"';
            }
            else{
                let x = tmp.eq(1).val();
                qry+=x;
            }
            qry+=" ";
            qry += operator[ tmp.eq(2).find(":selected").val()];
            qry+=" ";
            if(tmp.eq(4).find(":selected").val() == 0){
                let x = tmp.eq(3).val();
                if(typeof(x)=='number')qry+=x;
                else qry += '"'+x+'"';
            }
            else{
                let x = tmp.eq(3).val();
                qry+=x;
            }
            query+=qry;
        });
    }

    if($('#order-column-list').find(":selected").val() != 0){
        let temp = availableFeilds[$('#order-column-list').find(":selected").val()-1];
        query+=" ORDER BY "+temp+" ";
        if($('#order-value').find(":selected").val() == 0){
            query+="ASC ";
        }
        else{
            query+="DESC ";
        }
    }

    console.log(query);
    // return 0;
    let data={};
    data.query = query;
    data.selectColumns = selectedColumns;
    window.location = `/LabProject/api/get_result.php?query_data=${JSON.stringify(data)}`;
    
});

$('#select-all-column').change(function(){
    if(this.checked){
        $('#column-picker .form-check-input').each(function(){
            this.checked = true;
        });
    }
    else{
        $('#column-picker .form-check-input').each(function(){
            this.checked = false;
        });
    }
})

$('#condition-type').change(function(){
    if($(this).find(":selected").val() == 0){
        $('.collapse2').collapse('hide');
        $('.collapse3').collapse('hide');
        console.log('aa');
    }
    else if($(this).find(":selected").val() == 1){
        $('.collapse2').collapse('show');
        $('.collapse3').collapse('hide');
    }
    else if($(this).find(":selected").val() == 2){
        $('.collapse2').collapse('show');
        $('.collapse3').collapse('hide');
    }
    else if($(this).find(":selected").val() == 3){
        $('.collapse2').collapse('show');
        $('.collapse3').collapse('show');
        $('#condition-name-div').html('<b>AND</b>');
    }
    else if($(this).find(":selected").val() == 4){
        $('.collapse2').collapse('show');
        $('.collapse3').collapse('show');
        $('#condition-name-div').html('<b>OR</b>');
    }

})