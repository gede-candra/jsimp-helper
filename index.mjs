/**
 * 
 * @param {Array.<object>} ajaxPost 
 */
function ajaxPost({ url, data, button, loadingButtonColorClass = "text-light", errorMessage = null }) {
   const btn = $(button).html();

   $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      beforeSend: function () {
         if (button !== null) {
            $(button).empty().append(`
                  <div class="spinner-border ${loadingButtonColorClass}" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               `)
               .prop('disabled', true)
               .css('cursor', 'wait');
         }
      },
   }).done(function (res) {
      toastr.success(res.message);
   }).fail(function (res) {
      if (errorMessage != null || errorMessage != "") {
         toastr.error(errorMessage);
      } else {
         toastr.error(res.message);
      }
   }).always(function () {
      if (button !== null) {
         $(button).empty().append(btn).prop('disabled', false).css('cursor', 'auto');
      }
   });
}

/**
 * 
 * @param {*} value 
 * @param {String} locales 
 * @param {String} currency 
 */
function convertCurrency(value, locales = 'id-ID', currency = 'IDR') {
   return new Intl.NumberFormat(locales, { style: 'currency', currency: currency }).format(
      value,
   )
}

export {
   ajaxPost,
   convertCurrency,
};