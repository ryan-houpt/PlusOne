package plusonerobotics.plusonerobotics.controllers;



import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;
import com.binance.api.client.domain.TimeInForce;
import com.binance.api.client.domain.account.NewOrder;
import com.binance.api.client.domain.account.NewOrderResponse;
import com.binance.api.client.domain.account.Order;
import com.binance.api.client.domain.account.request.AllOrdersRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import com.binance.api.client.domain.account.NewOrder;

import java.util.List;

import static com.binance.api.client.domain.account.NewOrder.limitBuy;
import static com.binance.api.client.domain.account.NewOrder.marketBuy;
import static com.binance.api.client.domain.account.NewOrder.marketSell;

@Controller
public class Home {

    @GetMapping("/")
    public String home(Model model) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();

        model.addAttribute("pairs", client.getBookTickers());

        return "/home";
    }

    @PostMapping("buy/{pair}")
    public String buy100(@PathVariable String pair) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();

        client.newOrder(marketBuy(pair, "2"));
//
        return "redirect:/";
    }


    @PostMapping("sell/{pair}")
    public String sell(@PathVariable String pair) {

        BinanceApiClientFactory factory = BinanceApiClientFactory.newInstance("ippIfcn0Py3mPuzO4ggtCXT0yRalHk4V4yT0AHc42VVbdV3HeKFLhPm90enyfsjI", "oOy9ec1wKb7s6tgUaGsz7OKzZ7FJHudb4vQJ6UofNexqpksufGEDjd9z630YdqqF");
        BinanceApiRestClient client = factory.newRestClient();

        client.newOrder(marketSell(pair, "2"));

        return "redirect:/";
    }

}
