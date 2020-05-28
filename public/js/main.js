$(function () {
  $("input.phone").intlTelInput({
    //utilsScript: 'js/utils.js',
    defaultCountry: 'auto',
    separateDialCode: false,
    nationalMode: false,
    initialCountry: 'auto',
    geoIpLookup: function (callback) {
      $.get("https://ipinfo.io", function () {
      }, "jsonp").always(function (resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    },
    preferredCountries: ['ua', 'ru', 'by', 'kz']
  });

});

$(window).load(function () {
  $.getJSON('https://freegeoip.net/json/', function (data) {
    var country = data.country_code;
    if (country != 'UA') {
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-5JMBF4G');
    }
    if (getCookie("phone")) {
      $("#phone").val(getCookie("phone"));
    }
    else if (country === 'UA') {
      $('#phone').val('+380');
    }
    else if (country === "RU") {
      $('#phone').val('+7');
    }
    else {
      var countryData = $("#phone").intlTelInput("getSelectedCountryData");
      var dialCode = countryData.dialCode;
      $('#phone').val('+' + dialCode);
    }
  });
});

$(function(){
  // smooth scroll on anchors
  $(document).on('click', '.link-smooth', function (event) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top + 10
    }, 1500);
  });
});

function validate(formid) {
  var output = false;
  var name, email, phone, utm_source, utm_campaign, utm_medium, utm_term;
  form = $(formid);
  form.addClass('loading');
  form.find('input[name="name"]').focus();
  form.find('input[name="email"]').focus();
  form.find('input[name="phone"]').focus();
  form.find('button[type="submit"]').focus();
  name = form.find('input[name="name"]').val();
  email = form.find('input[name="email"]').val();
  phone = form.find('input[name="phone"]').val();
  utm_source = form.find('input[name="utm_source"]').val();
  utm_campaign = form.find('input[name="utm_campaign"]').val();
  utm_medium = form.find('input[name="utm_medium"]').val();
  utm_term = form.find('input[name="utm_term"]').val();
  phone = phone.replace(/\\s/g, '');
  if ($('.not_error').length == 3) {
    $.ajax(
      {
        type: "POST",
        url: 'gf/export.php',
        async: false,
        data: {
          name: name,
          email: email,
          phone: phone,
          utm_campaign: utm_campaign,
          utm_source: utm_source,
          utm_medium: utm_medium,
          utm_term: utm_term
        },
        success: function (json_data) {
          setCookie('name', name, 365);
          setCookie('email', email, 365);
          setCookie('phone', phone, 365);
          console.log('data sended!');
          console.log(json_data);
          setTimeout(function () {
            form.removeClass('loading');
          }, 5000)
          output = true;
        }
      });
    $.ajax(
      {
        type: "POST",
        url: 'ac/export.php',
        async: false,
        data: {
          list_id: list_id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone
        },
        success: function (response) {
          console.log(response);
          //window.location.replace('https://mediastart.school/kt-real/success')
        }
      });
  }
  else {
    form.find('input.error').first().focus();
    form.removeClass('loading');
  }
  return output;
};

$(function(){
  // set UTM to registration link
  var utm_source = getUrlParameter('utm_source');
  var utm_medium = getUrlParameter('utm_medium');
  var utm_term = getUrlParameter('utm_term');
  var utm_campaign = getUrlParameter('utm_campaign');
  var utm_content = getUrlParameter('utm_content');

  var registrationLink = 'https://platform.digitalizator.club/registration?';
  if(utm_source) registrationLink = registrationLink + 'utm_source=' + utm_source + '&';
  if(utm_medium) registrationLink = registrationLink + 'utm_medium=' + utm_medium + '&';
  if(utm_term) registrationLink = registrationLink + 'utm_term=' + utm_term + '&';
  if(utm_campaign) registrationLink = registrationLink + 'utm_campaign=' + utm_campaign + '&';
  if(utm_content) registrationLink = registrationLink + 'utm_content=' + utm_content + '&';

  $('.registration-link').attr('href', registrationLink);
});

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterN_ame,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function form_data_send(formid, success, amo_tags, amo_price, amo_status, radio, eventTitle) {
  var name, email, phone, mc_list_id, utm_term, utm_source, utm_medium, utm_campaign, utm_content, event;
  form = jQuery(formid);
  form.addClass('loading');
  form.find('input.name').focus();
  form.find('input.email').focus();
  form.find('input.phone').focus();
  form.find('input[type="submit"]').focus();
  name = form.find('.name').val();
  email = form.find('.email').val();
  phone = form.find('.phone').val();
  site = '';
  //site = form.find('.site').val();
  target = form.find('.target').val();
  utm_source = getParameterByName('utm_source');
  utm_medium = getParameterByName('utm_medium');
  utm_campaign = getParameterByName('utm_campaign');
  utm_term = getParameterByName('utm_term');
  utm_content = getParameterByName('utm_content');
  var utm = window.location.search.substr(1);
  // radio = form.find('.radio.active').data('choice');
  // mc_list_id = form.find('.radio.active').data('list-mc');
  // amo_status = form.find('.radio.active').data('list-amo');
  //radio = 'Стратегический консалтинг';
  mc_list_id = '50cb7efa1b';
  //amo_status = '22854913';
  phone = phone.replace(/\\s/g, '')

  if(eventTitle) {
    event = eventTitle;
  } else {
    event = 'consulting form submitted';
  }

  if ($('.not_error').length == 3)
  {
    send_to_amo(name, email, phone, radio, radio, amo_tags, amo_price, amo_status, site, target, utm_source, utm_medium, utm_campaign, utm_content, utm_term);
    //send_to_mailchimp(name, email, phone, mc_list_id);
    send_to_email(name, email, phone, radio);
    fbq('track', 'Lead');
    dataLayer.push({
      'event': event
    });
    setTimeout(function () {
      location.href = success;
    }, 2000)
  }
  else
  {
    form.removeClass('loading');
    form.find('input.error').first().focus();
  }
}

function getParameterByName(name) {
  name = name.replace(/[\\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\\?&]" + name + "=([^&#]*)");
  results = regex.exec(location.search); // из адреса страницы
  return results === null ? "" : decodeURIComponent(results[1].replace(/\\+/g, " "));
}