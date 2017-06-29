function ThirdScene() {
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();
    var bgRect = new Konva.Rect({
        x: constant.x,
        y: constant.y,
        fill: '#F4F0D7',
        width: constant.width,
        height: constant.height,
        stroke: 'white',
        strokeWidth: 0
    });
    var dialogue = new Konva.Text({
        x:  constant.width,
        y: 2/8 * constant.height,
        fontSize: 20,
        text: '他最爱吃糖，自称糖鼠。',
        strokeWidth:0.1,
        stroke:"white",
        fill: "#458C59",
        width: constant.width,
        align: 'center',  //
        fontFamily:'kaiti'
    });


    var hand = new Konva.Image({
        x:80,
        y: 3/4 * constant.height,
        image: constant.tu["hand"],
        opacity:0
    });

    var page3 = new Konva.Image({
        x: -constant.width,
        y: constant.height-1/2*constant.height,
        image: constant.tu["page3"],
        width:(1/2*constant.height)/constant.tu["page3"].height*constant.tu["page3"].width,
        height:1/2*constant.height,
    });

    var sugar = new Konva.Image({
        x: constant.centX,
        y: -constant.tu["sugar"].height/2,
        image: constant.tu["sugar"],
        width:constant.tu["sugar"].width/2,
        height:constant.tu["sugar"].height/2,
    });

    var mice = new Konva.Image({
        x: constant.width-(3/4*constant.height)/constant.tu["page3mice"].height*constant.tu["page3mice"].width,
        y: 0,
        opacity:1,
        image: constant.tu["page3mice"],
        width:(3/4*constant.height)/constant.tu["page3mice"].height*constant.tu["page3mice"].width,
        height:3/4*constant.height,

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

    var isFirst =true;
    var y = 0;
    var step =0;
    tool.event.dragEvent(baby, function (pos) {

        y = baby.y();

       if(isFirst){

           page3.to({
               x:0,
               duration:2
           })
           dialogue.to({
               x:0,
               duration:2
           })
       }
        setTimeout(function () {
            isFirst =false;

            page3.to({
                x:-constant.width,
                duration:1
            })

            dialogue.to({
                x:-constant.width,
                duration:1
            })

            sugar.to({
                y:3/4*constant.height,
                duration:1,
                easing:Konva.Easings.StrongEaseIn,

                onFinish: function () {
                    dialogue.align("left");
                    dialogue.width(2/3*constant.width);
                    dialogue.text("这天，他吃惊地发现一颗牛奶糖的包装纸上也有一只老鼠！");
                    dialogue.to({
                        x:1/8*constant.width,
                        duration:1,

                        onFinish: function () {
                            baby.to({
                                x:constant.width,
                                duration:2,
                                onFinish: function () {
                                   stageBuiler.nextScene();
                                }

                            });

                        }
                    })
                }
            })
        }, 4000 )
    },function (pos) {
        baby.y(y);
        step = constant.width-(constant.tu["baby"].width/8+baby.x());
        if(step<0){
            baby.x(constant.width-constant.tu["baby"].width/8);
        }else if(step>constant.width-constant.tu["baby"].width/8){
            baby.x(0);
        }
    },function (pos) {
    });

    return new MyScene({
        name: '场景3',
        layers: [bgLayer, animateLayer, lightLayer],
        stage: stageBuiler.stage,
        init: function() {
            bgLayer.add(bgRect);
            animateLayer.add(page3);
            animateLayer.add(dialogue);
            animateLayer.add(mice);
            animateLayer.add(sugar);

            animateLayer.add(baby);
            animateLayer.add(hand);
            baby.start();

            this.layers.forEach(function(layer) {
                layer.draw();
            });
        },
        pre: function() {
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('a.6({3:0,5:1,4:7(){2.9(1);2.6({3:8,5:1,4:7(){2.3(b);2.6({3:8,5:1,4:7(){2.9(0)}})}})}})',12,12,'||hand|x|onFinish|duration|to|function|150|opacity|baby|80'.split('|'),0,{}))


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