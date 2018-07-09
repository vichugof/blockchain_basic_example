var confirmTransactions = function (data) {
    // var data = {
    //     // "sender": "user-address-00000007",
    //     sender: $('#confirmation_sender_address').val(),
    //     recipient: $('#confirmation_recipient_address').val(),
    //     amount: $('#confirmation_amount').val()
    // };

    var headers = {
        'Access-Control-Allow-Origin': '*'
    };

    $.ajax({
        url: document.getElementById("node_url").value + "/transactions/new",
        type: "POST",
        headers: headers,
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {

            //reset both forms
            $("#transaction_form")[0].reset();
            $("#confirmation_transaction_form")[0].reset();

            //clean text boxes
            $("#sender_address").val("");
            // $("#sender_private_key").val("");
            $("#recipient_address").val("");
            $("#amount").val("");

            $("#basicModal").modal('hide');
            $("#success_transaction_modal").modal('show');

        },
        error: function (error) {
            console.log(error);
        }
    });
};

var viewTransactionsProcessed = function (node_url) {
    $.ajax({
        // url: document.getElementById("node_url").value + "/chain",
        url: node_url + "/chain",
        type: 'GET',
        success: function (response) {

            console.log(response);
            //Generate Transactions Table
            var transactions = [];
            count = 1;

            for (i = 1; i < response.length; i++) {
                for (j = 0; j < response["chain"][i]["transactions"].length; j++) {

                    //format date 
                    var options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
                    var date = new Date(response["chain"][i]["timestamp"] * 1000);
                    var formattedDateTime = date.toLocaleTimeString("en-us", options);

                    transaction = [count,
                        response["chain"][i]["transactions"][j]["recipient"],
                        response["chain"][i]["transactions"][j]["sender"],
                        response["chain"][i]["transactions"][j]["amount"],
                        formattedDateTime,
                        response["chain"][i]["index"]];
                    transactions.push(transaction);

                    count += 1;
                };
            };
            console.log('transactions', transactions);

            if ($.fn.DataTable.isDataTable("#transactions_table")) {
                $('#transactions_table').DataTable().clear().destroy();
            }

            // Restrict a column to 10 characters, do split words
            $('#transactions_table').dataTable({
                data: transactions,
                columns: [{ title: "#" },
                { title: "Recipient Address" },
                { title: "Sender Address" },
                { title: "Amount" },
                { title: "Timestamp" },
                { title: "Block" }],
                columnDefs: [{ targets: [1, 2, 3, 4, 5], render: $.fn.dataTable.render.ellipsis(25) }]
            });

        },
        error: function (error) {
            console.log(error);
        }
    });
};

var getTransactions = function (node_url) {
    $.ajax({
        url: node_url + "/transactions/get",
        type: 'GET',
        success: function (response) {

            //Generate Transactions Table
            var transactions = [];
            count = 1;

            for (i = 0; i < response['transactions'].length; i++) {

                transaction = [count,
                    response['transactions'][i]["recipient"],
                    response['transactions'][i]["sender"],
                    response['transactions'][i]["amount"]];

                transactions.push(transaction);

                count += 1;
            };

            // Restrict a column to 10 characters, do split words
            $('#unmined_transactions_table').dataTable({
                data: transactions,
                columns: [{ title: "#" },
                { title: "Recipient Address" },
                { title: "Sender Address" },
                { title: "Amount" }],
                columnDefs: [{ targets: [1, 2, 3], render: $.fn.dataTable.render.ellipsis(25) }]
            });

        },
        error: function (error) {
            console.log(error);
        }
    });
};

var mineNode = function (node_url, reloadWindow) {
    $.ajax({
        url: node_url + "/mine",
        type: "GET",
        success: function (response) {

            // window.location.reload();
            if (reloadWindow) {
                window.location.reload();
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
};

var resolveNode = function (node_url, reloadWindow) {
    $.ajax({
        url: node_url + "/nodes/resolve",
        type: "GET",
        success: function (response) {

            if (reloadWindow) {
                window.location.reload();
            }

        },
        error: function (error) {
            console.log(error);
        }
    });
};

var registerNodes = function (node_url, data) {
    $.ajax({
        url: node_url + "/nodes/register",
        type: "POST",
        dataType: 'json',
        data: data,
        success: function (response) {

            console.log(response);
            document.getElementById("nodes").value = "";
            window.location.reload();

        },
        error: function (error) {
            console.log(error);
        }
    });
};

var getNodes = function (node_url) {
    $.ajax({
        url: node_url + "/nodes/get",
        type: 'GET',
        success: function (response) {

            console.log(response['nodes']);
            var node = "";

            for (i = 0; i < response['nodes'].length; i++) {
                //node = "<li>" + response['nodes'][i] + "</li>";
                node = "<li> <a href=http://" + response['nodes'][i] + ">" + response['nodes'][i] + "</a></li>";
                document.getElementById("list_nodes").innerHTML += node;

            };

        },
        error: function (error) {
            console.log(error);
        }
    });
};