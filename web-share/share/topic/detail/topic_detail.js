window.onload = function () {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    var DL = document.getElementById('downloadButton')

    if (ua.indexOf('android') > -1) {
      DL.href =
        'http://a.app.qq.com/o/simple.jsp?pkgname=shengang.szkingdom.android.phone'
      DL.target = '_blank'
    } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
      DL.href =
        'http://a.app.qq.com/o/simple.jsp?pkgname=shengang.szkingdom.android.phone'
      DL.target = '_blank'
    }
  } else {
    var DL = document.getElementById('downloadButton')
    if (ua.indexOf('android') > -1) {
      DL.href =
        'http://a.app.qq.com/o/simple.jsp?pkgname=shengang.szkingdom.android.phone'
      DL.target = '_blank'
    } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
      DL.href = 'itms-apps://itunes.apple.com/cn/app/id1329190498'
      DL.target = '_blank'
    }
  }
}
$(function () {
  function formatDate(timestamp) {
    var date = new Date(parseInt(timestamp * 1000))
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return (
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    )
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  }

  var APP_DOWN_URL =
    'http://a.app.qq.com/o/simple.jsp?pkgname=shengang.szkingdom.android.phone'
  var scheme = 'community://'
  $('#downloadButton').click(function () {
    // var ifr = document.createElement('iframe');
    // ifr.src = scheme;
    // ifr.style.display = 'none';
    // document.body.appendChild(ifr);
    // window.setTimeout(function () {
    //    document.body.removeChild(ifr);
    //    window.location.href = APP_DOWN_URL
    // }, 300);

    window.location.href = scheme
    window.setTimeout(function () {
       window.location.href = APP_DOWN_URL
    }, 3000);
  })

  requestTopicDetailWithID()

  function requestTopicDetailWithID() {
    const topicID = getQueryVariable('topic_id')
    var url = `http://www.neighborsay.com/api/v1/mobile/topic/get_detail?topic_id=${topicID}&filter=1&cursor=0`
    console.log(url)
    $.get(url, function (result) {
      console.log(result)
      if (result.code > 0) {
        loadCommentWithData(result.data)
      }
    })
  }

  function loadCommentWithData(data) {
    console.log(data)
    const author = data.author
    $('#topic-title').html(`${data.title}`)
    $('#owner-avatar')
      .find('img')
      .attr(
        'src',
        `http://x-community.oss-cn-shanghai.aliyuncs.com/image/202010/fbfb5447cac0d392ef0c8c545eb29c00.jpg`
      )
    var content = `<p>${data.content}</p>`
    $('#bbs-thread-content').html(content)
    $('#owner-name').html(author.username)
    var time_label = `${formatDate(data.update_at)}<span>评论 ${
      data.comment_count
    }</span>`
    $('#pub-time').html(time_label)
    let commentsHtml = ''
    $.each(data.comments, function () {
      const author = this.author
      commentsHtml += `<div class="hp-m-discuss-item" id="${this.comment_id}">`
      commentsHtml += `<div class="hp-m-discuss-item-wrap">`
      commentsHtml += `<div class="hp-m-discuss-item-wrap-title"><a href="#"><img class="title-header-logo" src="${author.avatar}"></a>`
      commentsHtml += `<div class="user-nickname"><a href="#"><span>${author.username}</span></a>`
      if (this.is_topic_author) {
        commentsHtml += '<span class="lz-icon">楼主</span>'
      }
      commentsHtml += '</div>'
      commentsHtml += `<div class="discuss-light"><span class="light-icon"></span>亮了(${this.like_count})</div>`
      commentsHtml += '</div>'
      commentsHtml +=
        '<div class="hp-m-discuss-item-wrap-content"><div class="hp-m-discuss-item-wrap-content-container">'
      commentsHtml += `<p>${this.content}</p>`
      commentsHtml += '</div></div>'
      commentsHtml += '<div class="hp-m-discuss-item-wrap-footer">'
      commentsHtml += `<div class="discuss-time">${formatDate(
        this.create_at
      )}</div>`
      // commentsHtml += `<div class="watch-discuss">查看评论(11)</div>`
      commentsHtml += '</div>'
      commentsHtml += `</div>`
      commentsHtml += `</div>`
    })
    $('#replyAreaLight').append(commentsHtml)
  }
})
