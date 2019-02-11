package plusonerobotics.plusonerobotics.controllers;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import plusonerobotics.plusonerobotics.models.Mobile;
import static com.binance.api.client.domain.account.NewOrder.marketBuy;
import static com.binance.api.client.domain.account.NewOrder.marketSell;


@Controller
public class MainController {

    @GetMapping("/")
    public String home(Model model) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();

        model.addAttribute("BTC", client.getAccount().getAssetBalance("BTC").getFree());

        return "system/home";
    }

    @PostMapping("buy/{pair}")
    public String buy100(@PathVariable String pair) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();
        String message = "You bought " + pair;

        client.newOrder(marketBuy(pair, "2"));
        Mobile.sendText(message);
        return "redirect:/";
    }


    @PostMapping("sell/{pair}")
    public String sell(@PathVariable String pair) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();
        String message = "You sold " + pair;

        client.newOrder(marketSell(pair, "2"));
        Mobile.sendText(message);

        return "redirect:/";
    }

}
