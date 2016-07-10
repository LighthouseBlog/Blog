export class Helpers{
    // Gets template path for given component
    public static getTemplatePath(name: string){
        if(name === "app"){
            return "app/" + name + ".component.html"
        }else{
            return "app/components/" + name + "/" + name + ".component.html";
        }
    }

    // Get style path
    public static getStylePath(name: string){
        if(name === "app"){
            return "app/" + name + ".component.css"
        }else{
            return "app/components/" + name + "/" + name + ".component.css";
        }
    }
}