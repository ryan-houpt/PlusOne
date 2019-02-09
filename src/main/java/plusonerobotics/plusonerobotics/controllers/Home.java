package plusonerobotics.plusonerobotics.controllers;



import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class Home {

    @GetMapping("/")
    public String home(Model model) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();

        model.addAttribute("pairs", client.getBookTickers());

        return "/home";
    }

//    @PostMapping("/{pair}")
//    public String pair(Model model, @PathVariable String pair) {
//
//        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
//        BinanceApiRestClient client = factory.newRestClient();
//
//        model.addAttribute("currentPair", client.get24HrPriceStatistics(pair));
//        return "redirect:/";
//    }

}
