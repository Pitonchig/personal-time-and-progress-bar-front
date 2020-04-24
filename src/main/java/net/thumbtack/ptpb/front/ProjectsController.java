package net.thumbtack.ptpb.front;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProjectsController {

    @GetMapping("/projects")
    public String getProjects(Model model) {
        model.addAttribute("url", "");
        return "projects";
    }
}
