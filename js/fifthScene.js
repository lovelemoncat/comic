function FifthScene() {
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();
    var bgRect = new Konva.Rect({
        x: constant.x,
        y: constant.y,
        fill: '#B5DCEF',
        width: constant.width,
        height: constant.height,
        stroke: 'white',
        strokeWidth: 0
    });
    var xuan = new Konva.Image({
        x: constant.centX-75,
        y: constant.centY-75,
        image: constant.tu["xuan"],
        width:150,
        height:150,
        opacity:0
    });

    xuan.on('mousedown touchstart', function (e) {
        window.location.href="https://lovelemoncat.github.io/lemoncat/";
    })
    var bus = new Konva.Image({
        x: constant.width-(2/3*constant.height)/constant.tu["bus"].height*constant.tu["bus"].width,
        y: 1/8*constant.height,
        image: constant.tu["bus"],
        width:(2/3*constant.height)/constant.tu["bus"].height*constant.tu["bus"].width,
        height:2/3*constant.height

    });
    var miceAnimations1 = {
        idle: [
            0, 0, 280, 316,
            281, 0, 280, 316
        ]
    };
    var mice5 = new Konva.Sprite({
        x: constant.centX-50,
        y: 2/5 * constant.height,
        scale:{x:0.8,y:0.8},
        image: constant.tu["mice5"],
        animation: 'idle',
        animations: miceAnimations1,
        frameRate: 2,
        frameIndex: 0,
    });
    var dialogue = new Konva.Text({
        x:  1/20 * constant.width,
        y: 2/10 * constant.height,
        fontSize: 20,
        text: '　　米鼠让糖鼠照着自己的样子化装一下。\n　　化装成米鼠的糖鼠出发去糖果厂了。',
        fill: "#458C59",
        width: 3/8 * constant.width,// 配合让文字居中
        align: 'center',  //
        fontFamily:'kaiti'
    });
    var goText = new Konva.Text({
        x:-3/8 * constant.width,
        y: 3/4 * constant.height-20,
        fontSize: 20,
        text: '出发吧',
        fill: "gray",
        width: 3/8 * constant.width,
        align: 'center',  //
        fontFamily:'kaiti'
    });

    var lastText = new Konva.Text({
        x:0,
        y:80,
        fontSize: 30,
        text: '可怜的娃，人家都走了',
        fill: "#485860",
        width: constant.width,
        align: 'center', 
        fontFamily:'kaiti',
        opacity:0
    });
    var hand = new Konva.Image({
        x:80,
        y: 3/4 * constant.height,
        image: constant.tu["hand"],
        opacity:0.1
    });
    var babyanimations = {
        idle: [
            0, 0, 182, 149,
            183, 0, 182, 149,
            365, 0, 182, 149,
            547, 0, 182, 149,
        ]
    };
    var baby = new Konva.Sprite({
        x:-constant.tu["baby"].width/8,
        y: 3/4 * constant.height,
        scale:{x:0.5,y:0.5},
        image: constant.tu["baby"],
        animation: 'idle',
        animations: babyanimations,
        frameRate: 7,
        frameIndex: 0,
        draggable: true
    });
    baby.on('dragend', function (e) {
        mice5.opacity(0);
        bus.to({
            x:constant.width,
            duration:2,
            onFinish: function () {
                lastText.to({
                    opacity:1,
                    onFinish: function () {
                        setTimeout(function () {
                            lastText.fontSize(20);
                            lastText.text("仅做技术展示，无意冒犯原著\n以女儿为创作灵感，半岁了\n修图13张 代码1200行 耗时：3天\n策划、程序：小鬼鬼\n\n点击头像留言");
                            xuan.to({
                                opacity:1,
                                duration:2
                            });
                        }, 1000 )
                    }
                });
            }
        });
        dialogue.to({
            x:-3/8 * constant.width,
            duration:2
        });
        goText.to({
            x:constant.width
        });
    });

    return new MyScene({
        name: '场景5',
        layers: [bgLayer, animateLayer, lightLayer],
        stage: stageBuiler.stage,
        init: function() {

            bgLayer.add(bgRect);


            animateLayer.add(dialogue);
            animateLayer.add(bus);
            animateLayer.add(mice5);
            animateLayer.add(hand);
            animateLayer.add(baby);
            animateLayer.add(goText);
            animateLayer.add(xuan);
            animateLayer.add(lastText);
            mice5.start();
            baby.start();

            this.layers.forEach(function(layer) {
                layer.draw();
            });
        },
        pre: function() {
            bus.to({
                x:constant.centX,
                duration:2,
                onFinish: function () {

                    baby.to({
                        x:0,
                        duration:1,
                        onFinish: function () {

                            hand.opacity(1);
                            hand.to({
                                x:150,
                                duration:1,

                                onFinish: function () {
                                    hand.x(80);
                                    hand.to({
                                        x:150,
                                        duration:1,
                                        onFinish: function () {
                                            hand.opacity(0);
                                        }
                                    });
                                }
                            });
                        }
                    });
                    goText.to({
                        x:10
                    });
                }
            });

        },
        post: function( dopre ) {

            var self = this;

            self.layers.forEach(function (item) {
                item.destroy();
            });
            dopre();
        }
    });
}