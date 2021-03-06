
ezstory

/**
 * post header controller
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $http    [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $sce){                      $scope.getLinkedAccounts [description]
 * @return {[type]}          [description]
 */
.controller('postCtrl', function($scope, $http, $timeout, $sce, $parse){
    // post data holder
    $scope.post = {};

    // get linked accounts
    $scope.getLinkedAccounts = function(){
        $http.get('/site/accounts').success(function(data, status, headers, config) {
            $scope.wordpressAccounts = data.wordpress;
            $scope.twitterAccounts = data.twitter;
        })
    }
    $scope.getLinkedAccounts();


    // get post header template
    $scope.getPostHeaderTpl = function(){
        return '/template/postHeader/index.html';
    }

    // get post body template
    $scope.getPostBodyTpl = function(){
        return '/template/postBody/index.html';
    }

    $scope.loadPostHeaderModal = function(){
        return '/template/postHeader/header_modal.html';
    }

    // show linked accounts
    $scope.showAccounts = function(event){
        var $obj = $(event.target);

        $obj.closest('.pw-span').find('.pw-account-wrap').slideToggle(300);
    }

    // load link account form
    $scope.loadWpForm = function(event){
        var $obj = $(event.target);
        $('.load-wp-form').modal('show');
    }

    // show post body
    $scope['selBlogAccounts'] = {};
    $scope.showBlogContainer = function(event){
        var $obj = $(event.target),
            title = $obj.attr('data-title'),
            id = $obj.attr('data-id'),
            type = $obj.attr('data-type'),
            selectedAccount = 'selected_'+type+'_'+id;
        

        // if exist selected account before and click again, then cancel it
        if( $scope['selBlogAccounts'][ selectedAccount ] ){
            $scope['selBlogAccounts'][ selectedAccount ] = false;

            $scope.blogTitle = null;
            $scope.showBlogPostContainer = false;
        }else{
            // new selected account, show all corresponding data
            $scope['selBlogAccounts'] = [];
            $scope['selBlogAccounts'][ selectedAccount ] = true;

            $scope.blogTitle = title;
            $scope.showBlogPostContainer = true;
        }
    }


    // show twitter post body
    $scope.selTwitterAccounts = {};
    $scope.showTwitterContainer = function(event){
        var $obj = $(event.target),
            title = $obj.attr('data-title'),
            id = $obj.attr('data-id'),
            type = $obj.attr('data-type'),
            selectedAccount = 'selected_twitter_'+id;


        // if exist selected account before and click again, then cancel it
        if( $scope['selTwitterAccounts'][ selectedAccount ] ){
            delete $scope['selTwitterAccounts'][ selectedAccount ];
        }else{
            // new selected account, show all corresponding data
            $scope['selTwitterAccounts'][ selectedAccount ] = title;
        }

        if($.isEmptyObject($scope['selTwitterAccounts'])){
            $scope.showTwitterPostContainer = false;
        }else{
            $scope.showTwitterPostContainer = true;
        }
    }

    /**
     * post content
     * @return {[type]} [description]
     */
    $scope.postContent = function(){
        // if exist blog post
        if($scope.showBlogPostContainer){
            $scope.post.wordpress.content = $('.wordpress-content').code();
        }

        $http({
            method: 'POST',
            url: '/compose/social/post',
            data: $scope.post,
        }).success(function(res){
            
        })
    }
})


/**
 * social content controller
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $http    [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $sce     [description]
 * @return {[type]}          [description]
 */
.controller('socialCtrl', function($scope, $http, $timeout, $sce){
    // define currently social type, default is twitter
    $scope.currentSocialType = 'twitter';

    // define output default image path
    $scope.outputDefaultImg = '/image/arrow-up.png';

    // define social data is empty array
    $scope.socialData = [];

    // loading text 
    $scope.loadingText = "Load More";

    // define ng-model data, "If you use ng-model, you have to have a dot in there." 
    // Without a dot, your child scope creates it's own value, overwriting the inherited value from the parent scope.
    $scope.ezDt = {
        // search keyword
        keyword : '',
        // search type is text
        keyword_type : 'text'
    }

    /**
     * reset social data to empty array
     * @return {[type]} [description]
     */
    $scope.resetSocialDt = function(){
        $scope.socialData = [];
    }

    /**
     * change social type
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    $scope.changeType = function(event){
        $scope.resetSocialDt();

        var $obj = $(event.target),
            type = $obj.attr('data-type');

        $obj.siblings('i').removeClass('active');
        $obj.addClass('active');

        $scope.currentSocialType = type;
        $scope.search();
    }

    /**
     * change input search type
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    $scope.updateSearchType = function(event){
        $scope.resetSocialDt();
        
        $scope.search();
    }

    /**
     * get social input template
     * @return {[type]} [description]
     */
    $scope.getInputTpl = function(){
        return '/template/socialInput/' + $scope.currentSocialType + '.html';
    }

    /**
     * get social output template
     * @return {[type]} [description]
     */
    $scope.getOutputTpl = function(){
        return '/template/socialOutput/' + $scope.currentSocialType + '_' + $scope.ezDt.keyword_type + '.html';
    }

    /**
     * click enter start search
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    $scope.searchPress = function(event){
        var keyCode = event.keyCode;
        if(keyCode == 13){
            $scope.search();
        }
    }


    /**
     * search 
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    $scope.search = function(nextPage){
        $scope.removeGuide = true;
        $scope.searchLoading = 'Loading...';

        // build url
        var url = '/social/' + $scope.currentSocialType + '/search';
        var nextPage = nextPage ? nextPage : null;
        var data = {
            keyword : $scope.ezDt.keyword,
            keyword_type : $scope.ezDt.keyword_type
        }

        if(nextPage != null){
            data.next_page = nextPage;
        }

        $http({
            method: 'POST',
            url: url,
            data: $.param(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(res){
            $scope.loadingText = 'Load More';
            $scope.searchLoading = false;

            if(res.error){
                $scope.noAccount = true;
                $scope.noAccountMessage = $sce.trustAsHtml( res.message );
            }else{
                if(res.data){
                    if(nextPage){
                        $scope.socialData = $scope.socialData.concat(res.data);
                    }else{
                        $scope.socialData = res.data;
                    }
                }
                $scope.nextPage = res.next_page ? res.next_page : null;
            }
        })
    }


    /**
     * load more data for any social type
     * @return {[type]} [description]
     */
    $scope.loadMoreData = function(event){
        var $obj = $(event.target),
            originStr = $obj.html();

        $scope.loadingText = "Loading...";
        if($scope.nextPage != null){
            $scope.search( $scope.nextPage );
        }
    }
})


/**
 * link wordpress form controller
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $http    [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $sce){                      $scope.saveWordpressAccount [description]
 * @return {[type]}          [description]
 */
.controller('wordpressFormCtrl', function($scope, $http, $timeout, $sce){
    // save wordpress account
    $scope.saveWordpressAccount = function(wpForm){
        $scope.wpform_loading = true;

        $http({
            method: 'POST',
            url: '/compose/wordpress/save-account',
            data: $.param(wpForm),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(res){
            $scope.wpform_loading = false;
            $scope.wpform_error = res.error;
            $scope.wpform_alert = true;

            // set error or success message
            if($scope.wpform_error){
                $scope.wpform_message = res.message;
            }else{
                // append the new data to wordpress accounts
                $scope.wordpressAccounts.push(res.data);
                // message
                $scope.wpform_message = "Well done! You successfully link your wordpress account.";
                $scope.wpForm = null;
            }
        })
    }
})