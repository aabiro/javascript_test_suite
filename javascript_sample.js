(function(document, window, $) {
    'use strict';
  
    var Site = window.Site;
    $(document).ready(function($) {
      Site.run();
    });
  
    function findParam(item){
      var searchValue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
      if(searchValue === null){
        return 'de';
      }
      return searchValue ? searchValue[1] : searchValue;
    }
  
    (function() {
      I18n.locale = findParam("locale");
      $.extend(true, $.fn.dataTable.defaults, {
        language: {
          sLengthMenu: "_MENU_",
          search: "_INPUT_",
          thousands: '.',
          processing: '<div class="loader vertical-align-middle loader-default"></div>',
          searchPlaceholder: I18n.t('filters.search'),
          zeroRecords: I18n.t('filters.zero_records'),
          paginate: {
            next: (I18n.t('filters.paginate.next')),
            previous: (I18n.t('filters.paginate.previous'))
          }
        }
      });
  
      var offsetTop = 0;
      if ($('.site-navbar').length > 0) {
        offsetTop = $('.site-navbar').eq(0).innerHeight();
      }
  
      var intValue = function ( i ) {
        if (typeof i === 'string'){
          i = i.split(" ");
          i = i[0].replace(/[^0-9]/g, '');
          return i*1;
        } else if (!isNaN(i)) {
          return i * 1;
        } else {
          return 0;
        }
      };
  
      function validate( i ) {
        return isNaN(i) ? 0 : i * 1;
      };
  
      var recordDom = '<"top"<"row"<"col-sm-2 col-lg-2 padding-right-0 padding-top-10"'+
      '<"col-xs-3 col-sm-3 col-lg-3 padding-0"l><"col-xs-9 col-sm-9 col-lg-9"f>>'+
      '>>rt<"bottom"ip><"clear">';
  
      var recordsTable = $('#records-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
          url: $('#records-table').data('source'),
          data: function ( d ) {
            d.column_selected = d.columns[d.order[0].column].data;
            d.direction_sorted = d.order[0].dir;
          }
        },
        pagingType: 'simple_numbers',
        columns: [
          { 'data': 'date' },
          { 'data': 'source_id' },
          { 'data': 'title' },
          { 'data': 'source' },
          { 'data': 'address' },
          { 'data': 'city' },
          { 'data': 'type' },
          { 'data': 'use_types' },
          { 'data': 'price' },
          { 'data': 'size' },
          { 'data': 'seekers' },
          { 'data': 'buyers' },
          { 'data': 'developers' },
          { 'data': 'consultants' },
          { 'data': 'area' },
          { 'data': 'property_value' },
          { 'data': 'lonlat' },
          { 'data': 'data' },
          { 'data': 'dt_actions' }
        ],
        dom: recordDom,
        order: [[0, 'desc']],
        lengthChange: false,
        pageLength: 25,
        columnDefs: [
          { visible: false, targets: [1, 2, 3, 4, 14, 15, 16, 17] },
          { width: '9.8%', targets: [0, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
          { render: $.fn.dataTable.render.ellipsis(20), targets: [7, 10, 11, 12, 13] },
          { className: 'body-text-right', targets: [8, 9] },
          { responsivePriority: 1, targets: -1 },
          {
            targets: [18],
            createdCell: function(td, cellData, rowData, rowIndex, colIndex) {
              td.setAttribute('id', 'record-tooltip-action')
            }
          }
        ],
        fixedHeader: {
          header: true,
          headerOffset: offsetTop
        },
        language: {
          info: I18n.t('records.info', {start: '_START_', end: '_END_', total: '_TOTAL_'}),
          infoFiltered: '',
          infoEmpty: ''
        }
      });
  
      $("div#records-table_wrapper .top .row .col-sm-2.col-lg-2.padding-right-0").before($(".records-table-search").html());
      $(".records-table-search").html('');
  
      $(window).on('resize', function() {
        recordsTable.responsive.recalc();
      });
  
      var reportFilesTable = $('#rentoll-files-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: $('#rentoll-files-table').data('source'),
        pagingType: 'simple_numbers',
        columns: [
          { 'data': 'created_at' },
          { 'data': 'file_name' },
          { 'data': 'file_type' },
          { 'data': 'file_size' },
          { 'data': 'status' },
          { 'data': 'dt_actions' }
        ],
        order: [[ 0, 'desc' ]],
        lengthChange: false,
        bInfo: true,
        searching: false,
        columnDefs: [
          {
            targets: [4],
            createdCell: function(td, cellData, rowData, rowIndex, colIndex) {
              if (cellData === I18n.t('report_files.status.uploaded')) {
                $(td).addClass('report-status-warning');
              } else if (cellData === I18n.t('report_files.status.processed')) {
                $(td).addClass('report-status-success');
              } else {
                $(td).addClass('report-status-danger');
              }
            }
          }
        ],
        language: {
          info: I18n.t('report.info', {start: '_START_', end: '_END_', total: '_TOTAL_'}),
          infoFiltered: '',
          infoEmpty: ''
        }
      });
  
      var unitsTable = $('#unitsTable').DataTable({
        pagingType: "simple_numbers",
        dom:' <"search"fl><"top">rt<"bottom"ip><"clear">',
        pageLength: 25,
        bFilter: true,
        lengthChange: true,
        columnDefs: [
          { className: 'text-right', targets: [3, 8, 9, 10, 11] },
          { className: 'text-left', targets: [0, 1, 2, 4, 5, 6, 7] }
        ],
        fixedHeader: {
          header: true,
          headerOffset: offsetTop
        },
        language: {
          info: I18n.t('report.info', {start: '_START_', end: '_END_', total: '_TOTAL_'}),
          infoFiltered: '',
          infoEmpty: ''
        }
      });
  
      $(window).on('resize', function() {
        unitsTable.responsive.recalc();
      });
  
      var reportsTable = $('#reportsTable').DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
          url:  $('#reportsTable').data('source'),
          data: function ( d ) {
              d.column_selected = d.columns[d.order[0].column].data;
              d.direction_sorted = d.order[0].dir;
          }
        },
        pagingType: 'simple_numbers',
        pageLength: 25,
        bFilter: true,
        lengthChange: true,
        order: [[ 0, 'desc' ]],
        lengthChange: false,
        columns: [
          {"data": "id"},
          {"data": "address"},
          {"data": "main_use"},
          {"data": "area"},
          {"data": "num_floors"},
          {"data": "tenant_name"},
          {"data": "report_start"},
          {"data": "report_end"},
          {"data": "remaining_report_time"},
          {"data": "value"},
          {"data": "size"},
          {"data": "service_charges"}
        ],
        columnDefs: [
          { className: 'text-right', targets: [3, 8, 9, 10, 11] },
          { className: 'text-left', targets: [0, 1, 2, 4, 5, 6, 7] }
        ],
        fixedHeader: {
          header: true,
          headerOffset: offsetTop
        },
        language: {
          info: I18n.t('report.info', {start: '_START_', end: '_END_', total: '_TOTAL_'}),
          infoFiltered: '',
          infoEmpty: ''
        }
      });
  
      $(window).on('resize', function() {
        reportsTable.responsive.recalc();
      });
    })();
  })(document, window, jQuery);
  