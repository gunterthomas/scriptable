class ChristmasWidget
{
    run()
    {
        let widget = this.deployWidget();
        if (!config.runsInWidget) {
            widget.presentSmall();
        }
        Script.setWidget(widget);
        Script.complete();
    }

    deployWidget()
    {
        let list = new ListWidget();
        list.setPadding(12, 12, 12, 12);

        let titleTxt = list.addText("🎅 COUNTDOWN\nUNTIL CHRISTMAS");
        titleTxt.font = Font.mediumSystemFont(13);

        list.addText("");

        let daysLeft = this.calculateDaysLeft();
        let daysLeftTxt = list.addText(daysLeft + " Days");
        daysLeftTxt.textColor = this.decideDisplayColor(daysLeft);
        daysLeftTxt.font = Font.boldSystemFont(24);

        list.addText("");

        let treeBottomLine = list.addText(this.calculateAdvent());
        treeBottomLine.font = Font.boldSystemFont(24);

        return list;
    }
    
    calculateAdvent()
    {
        let today = new Date(Date.now());
        let christmas = new Date(Date.now());
        christmas.setMonth(11);
        christmas.setDate(24);
      
        // check if we need to use christmas next year
        if (
           today.getMonth() === christmas.getMonth() 
           && today.getDate() > christmas.getDate()
        ) {
            return "🎄🎄🎄🎄";
        }
        
        let advent = christmas;       
        let christmasDayOfWeek = christmas.getDay();
        
        advent.setDate(christmas.getDate() - christmasDayOfWeek);
        
        let fourthAdvent = new Date();
        fourthAdvent.setDate(advent.getDate());
        fourthAdvent.setMonth(advent.getMonth());
        fourthAdvent.setFullYear(advent.getFullYear());
        
        advent.setDate(fourthAdvent.getDate() - 0);
        if (today > advent) {
            return "🕯🕯🕯🕯�";
        }

        advent.setDate(fourthAdvent.getDate() - 7);
        if (today > advent) {
            return "🕯🕯🕯🎄";
        }
        
        advent.setDate(fourthAdvent.getDate() - 14);
        if (today > advent) {
            return "🕯🕯🎄🎄";
        }


        advent.setDate(fourthAdvent.getDate() - 21);
        if (today > advent) {
            return "🕯🎄🎄🎄";
        }
        
        return "🎄🎄🎄🎄";
    }

    calculateDaysLeft()
    {
        let today = new Date(Date.now());
        let christmas = new Date(Date.now());
        christmas.setMonth(11);
        christmas.setDate(24);

        // check if we need to use christmas next year
        if (
           today.getMonth() === christmas.getMonth() 
           && today.getDate() > christmas.getDate()
        ) {
            let nextYear = christmas.getFullYear() + 1;
            christmas.setFullYear(nextYear);
        }

        christmas = christmas.getTime();
        today = today.getTime();

        let convertInDays = 24*3600*1000;
        
        return parseInt((christmas - today)/convertInDays);
    }

    decideDisplayColor(daysLeft)
    {
        if (daysLeft >= 50) {
            return Color.red();
        }

        if (daysLeft >= 30) {
            return Color.yellow();
        }

        return Color.green();
    }
}

new ChristmasWidget().run();
