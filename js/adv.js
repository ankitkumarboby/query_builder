let selectedTableList =[];
let availableFeilds =[];

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
    selectedTableList=[];
    availableFeilds=[];
    $('#table-picker div').each(function(){
        let xtm=[];
        let tmp =$(this).children();
        if(tmp.eq(0).is(":checked")){
            xtm[0] = tmp.eq(1).text();
            selectedTableList.push(xtm[0]);
        }
        if(selectedTableList.length != 0){ 
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
            for(let i=0;i<data.length;++i){
                arr[i] = xtm[0]+'.'+data[i].COLUMN_NAME;
                availableFeilds.push(arr[i]);
            }
            updateCoulmnPicker();
            updateColumnDropdown();
            updateOrderDropdown();
            $('.collapse1').collapse('show');
        })
        .catch((error) => {
        console.log(error);
        });
    }
    });

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
    for(let i=0;i<selectedTableList.length;++i){
        query+= selectedTableList[i]+" ";
        if(i!=(selectedTableList.length-1))query+=",";
    }

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
});

$('#do-join').on('click',function(){
    window.location = `/LabProject/index.php/advance_search_joins`;
});


$('#condition-type').change(function(){
    if($(this).find(":selected").val() == 0){
        $('.collapse2').collapse('hide');
        $('.collapse3').collapse('hide');
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
