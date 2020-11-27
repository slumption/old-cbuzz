function display_rs(rs_data) {
    var rs_str_left = '';
    var top_rs_str = '<span class="' + header_class + ' s12">' + language_related_searches + ':&nbsp;</span>';
    if(rs_iba_url) {
        top_rs_str = '<span class="' + header_class + ' s12">' + '<a class="' + header_class + ' hover_blue s12" ' +'href="' + rs_iba_url + '" target="_blank">' + language_related_searches + '</a>' + ':&nbsp;</span>';
    }

    var max_related_searches = (rs_data.length < 6) ? rs_data.length : 6;
    for (var i = 0; i < rs_data.length; i++) {
        var rs_link = '<a class="' + header_class + ' bold hover_blue s12" href="' + rs_data[i].href_url + '" title="' + rs_data[i].term + '">' +  rs_data[i].term + '</a>';
        rs_str_left += rs_link;

        if (i < max_related_searches) {
            top_rs_str += rs_link + '&nbsp;&nbsp;';
        }
    }

    if(rs_iba_url) {
        document.getElementById('rs_container_left').innerHTML = '<div id="rs_title">' + '<a href="' + rs_iba_url + '" target="_blank">' + language_related_searches + '</a>' + '</div><div id="rs_container">' + rs_str_left + '</div>';
        document.getElementById('rs_container_portal').innerHTML = '<div id="rs_title">' + '<a href="' + rs_iba_url + '" target="_blank">' + language_related_searches + '</a>' + '</div><div id="rs_container">' + rs_str_left + '</div>';
    }
    else {
        document.getElementById('rs_container_left').innerHTML = '<div id="rs_title">' + language_related_searches + '</div><div id="rs_container">' + rs_str_left + '</div>';
        document.getElementById('rs_container_portal').innerHTML = '<div id="rs_title">' + language_related_searches + '</div><div id="rs_container">' + rs_str_left + '</div>';
    }
    document.getElementById('navbar').innerHTML = top_rs_str;
}

function set_sb_tokens() {
    if(token) {
        document.forms.frm_search.ltk.value = token;
         document.forms.frm_search_portal.ltk.value = token;
    }
    if(search_token) {
        document.forms.frm_search.stk.value = search_token;
        document.forms.frm_search_portal.stk.value = search_token;
    }
}

function display_portal(pq, pc_array) {
    var lpq = pq.replace(/&tk=[^&]*(?:&|$)/, '&');
    lpq = lpq.replace(/&$/, '');

    tc_string = '';
    tc_string += '<table width="100%" border="0" cellspacing="1" cellpadding="4"><tr>';
    for (var i = 0; i < upper_cell_count; i++) {
        var tc_href = lpq + '&aq=' + encodeURIComponent(tc_array[i]) + '&tk=' + token;
        var tc_link = '<a class="s13 blue hover_red lineh" href="' + tc_href + '" >' + tc_array[i] + '</a><br />';
        var td_string = '';
        if ( i == 0 ) {
            td_string = '<td width="' + upper_column_width + '" valign="top">';
        }
        else if ( i % upper_row_count == 0) {
            td_string = '</td><td width="' + upper_column_width + '" valign="top">';
        }
        tc_string += td_string + tc_link;
    }
    tc_string += '</td></tr></table><tr><td class="s5">&nbsp;</td></tr>';
    
    // popular categories
    pc_string = '';
    pc_string += '<table width="100%" border="0" cellspacing="0" cellpadding="0" >';

    for (var i = 0; i < lower_cell_count; i++) {
        var tr_td_string = '';
        if ( i == 0 ) {
            tr_td_string += '<tr>';
        }
        else if ( i % lower_column_count == 0) {
            tr_td_string += '</tr><tr>';
        }
        if (typeof(pc_array[i]) == 'undefined') {
            tr_td_string += '<td width="' + lower_column_width + '">&nbsp;</td>';
        }
        else {
            tr_td_string += '<td width="' + lower_column_width + '" class="padding_right_8 padding_bottom_8">';
            tr_td_string += '<table width="100%" border="0" cellpadding="0" cellspacing="2">';
            tr_td_string += '<tr><td valign="middle" class="padding_top_4 padding_bottom_4 padding_left_4" nowrap>';
            var pc_href = lpq + '&aq=' + encodeURIComponent(pc_array[i][0]) + '&tk=' + token;
            var pc_link = '<a href="' + pc_href + '" class="nd_dark_green nodecoration hover_red s12 height22" onmouseout="window.status=\'\'" onmouseover="window.status=\'' + pc_array[i][0].replace(/'/g, "\\'") + '\'; return true;">' + pc_array[i][0] + '</a>';
            tr_td_string += pc_link;
            tr_td_string += '</td></tr>';
            for ( var j = 1; j < pc_array[i].length; j++ ) {
                if (typeof(pc_array[i][j]) == 'undefined') {
                    tr_td_string += '<tr><td>&nbsp;</td></tr>';
                }
                else {
                    tr_td_string += '<tr><td class="padding_bottom_2 padding_left_4">';
                    var pc_href = pq + '&aq=' + encodeURIComponent(pc_array[i][j]) + '&tk=' + token;
                    var pc_link = '<a href="' + pc_href + '" class="blue hover_red s12 lineh" onmouseout="window.status=\'\'" onmouseover="window.status=\'' + pc_array[i][j].replace(/'/g, "\\'") + '\'; return true;">' + pc_array[i][j] + '</a>';
                    tr_td_string += pc_link;
                    tr_td_string += '</td></tr>';
                }
            }
            tr_td_string += '</table></td>';
        }
        pc_string += tr_td_string;
    }
    
    pc_string += '</tr></table></td></tr><tr><td class="s5">&nbsp;</td></tr></table></td>';
    tc_string += pc_string;

    // display
    document.getElementById("tc_container").innerHTML  = tc_string;
    document.getElementById("portal").style.display = 'block';
    document.getElementById("ads").style.display = 'none';
}

function display_content() {
    // set tokens for SB
    set_sb_tokens();

    // display rs
    display_rs(rs_data);

    // ads
    if(!force_portal) {
        display_oneclick();
    }
    //portal
    else {
        display_portal(pq, pc_array);
    }
}

// content display call
display_content();